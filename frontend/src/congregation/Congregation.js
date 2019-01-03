import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import { Box, Heading, Text, Button } from 'grommet';
import FetchableFuture from '../util/FetchableFuture';
import { Edit } from 'grommet-icons';
import axios from '../util/axios';
import Spinner from '../components/Spinner';
import CongregationFormModal from '../admin/CongregationFormModal';

class Congregation extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = { showEditCongregationModal: false };
        FetchableFuture.bind(this, { congregation: null });
    }

    componentDidMount() {
        this.fetchCongregation();
    }

    fetchCongregation() {
        this.state.congregation.fetch(axios.get('/congregation'));
    }

    render() {
        const { congregation, showEditCongregationModal } = this.state;
        if (congregation.loading) {
            return <Spinner />;
        }

        if (!congregation.value) {
            return null;
        }

        const { name, language, alternateLanguages } = congregation.value;
        return (
            <Box>
                <Box direction="row" justify="between">
                    <Heading level={2} margin="xsmall">{name} <Text size="0.6em" color="dark-4">{language}</Text></Heading>
                    <Box>
                        <Button icon={<Edit />} onClick={() => this.setState({ showEditCongregationModal: true })} />
                    </Box>
                </Box>
                <Box margin="xsmall">
                    <Text>Other Languages:</Text>
                    <ul>
                        {Array.isArray(alternateLanguages) && alternateLanguages.length
                            ? alternateLanguages.map(language => <li><Text>{language}</Text></li>)
                            : <li><Text>None</Text></li>}
                    </ul>
                </Box>
                {showEditCongregationModal && (
                    <CongregationFormModal
                        edit
                        value={congregation.value}
                        close={(success, congregation) => {
                            return this.setState((oldState) => {
                                const state = { showEditCongregationModal: false };
                                if (success) {
                                    state.congregation = oldState.congregation.clone();
                                    state.congregation.value = congregation;
                                }

                                return state;
                            });
                        }}
                    />
                )}

            </Box>
        );
    }
}

Congregation.propTypes = {};

export default Congregation;
