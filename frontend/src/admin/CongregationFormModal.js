import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Box, Layer, Heading, Button, FormField, TextInput } from 'grommet';
import { ChapterAdd } from 'grommet-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../util/axios';
import FetchableFuture from '../util/FetchableFuture';
import Spinner from '../components/Spinner';

class CongregationFormModal extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {};
        FetchableFuture.bind(this, { congregation: null });
    }

    async onSubmit(values) {
        const { close, create, edit } = this.props;
        if (create) {
            await this.state.congregation.fetch(axios.post('/congregations', values));
        } else if (edit) {
            await this.state.congregation.fetch(axios.put(`/congregations/${values._id}`, values));
        }

        close();
    }

    schema() {
        const { create, edit } = this.props;
        if (create) {
            return Yup.object().shape({
                name: Yup.string().min(3).max(50).required(),
                language: Yup.string().min(3).max(50).required(),
                alternateLanguages: Yup.array().of(Yup.string().min(2).max(30)),
                admin: Yup.object().shape({
                    name: Yup.string().min(3).max(50).required(),
                    email: Yup.string().email(),
                }).required(),
            });
        }

        if (edit) {
            return Yup.object().shape({
                name: Yup.string().min(3).max(50).required(),
                language: Yup.string().min(3).max(50).required(),
                alternateLanguages: Yup.array().of(Yup.string().min(2).max(30)),
            });
        }
    }

    render() {
        const { close, value, create } = this.props;
        const { congregation } = this.state;

        return (
            <Layer
                position="center"
                modal
                onClickOutside={close}
                onEsc={close}
            >
                <Formik
                    initialValues={value}
                    onSubmit={this.onSubmit}
                    validationSchema={this.schema()}
                    render={({ values, touched, errors, dirty, isSubmitting, isValid, handleChange, handleBlur, handleSubmit, handleReset, submitForm }) => (
                        <form onSubmit={handleSubmit}>
                            <Box pad="medium" gap="small">
                                <Heading level={3} margin="none">
                                    Add a congregation, group, or pre-group
                                </Heading>
                                <Box>
                                    <FormField
                                        label="Name"
                                        help="The full congregation name, such as 'West Corinth'"
                                        error={touched.name && errors.name}
                                        htmlFor="name"
                                    >
                                        <TextInput id="name" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                                    </FormField>
                                    <FormField
                                        label="Language"
                                        error={touched.language && errors.language}
                                        htmlFor="language"
                                    >
                                        <TextInput id="language" name="language" onChange={handleChange} onBlur={handleBlur} value={values.language} />
                                    </FormField>
                                    {create && (
                                        <>
                                            <FormField
                                                label="Initial User's Name"
                                                error={touched['admin.name'] && errors['admin.name']}
                                                htmlFor="admin.name"
                                            >
                                                <TextInput
                                                    id="admin.name"
                                                    name="admin.name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.admin.name}
                                                />
                                            </FormField>
                                            <FormField
                                                label="Initial User's Email"
                                                error={touched['admin.email'] && errors['admin.email']}
                                                htmlFor="admin.email"
                                            >
                                                <TextInput
                                                    id="admin.email"
                                                    name="admin.email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.admin.email}
                                                    type="email"
                                                />
                                            </FormField>
                                        </>
                                    )}
                                </Box>
                                <Box
                                    as="footer"
                                    gap="small"
                                    direction="row"
                                    align="center"
                                    justify="end"
                                    pad={{ top: 'medium', bottom: 'small' }}
                                >
                                    <Button
                                        label="Save"
                                        icon={congregation.loading ? <Spinner /> : <ChapterAdd />}
                                        type="submit"
                                        color="dark-3"
                                        primary
                                        disabled={congregation.loading || isSubmitting || !isValid}
                                        onClick={submitForm}
                                    />
                                    <Button plain label="Cancel" onClick={close} />
                                </Box>
                            </Box>
                        </form>
                    )}
                />
            </Layer>
        );
    }
}

CongregationFormModal.propTypes = {
    close: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        alternateLanguages: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
    create: PropTypes.bool,
    edit: PropTypes.bool,
};

CongregationFormModal.defaultProps = {
    value: { name: '', language: '', alternateLanguages: [], admin: { name: '', email: '' } },
};

export default CongregationFormModal;
