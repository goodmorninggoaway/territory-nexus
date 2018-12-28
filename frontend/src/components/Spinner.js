import React from 'react';
import { Spinning } from 'grommet-controls/es6/components/Spinning';

const Spinner = props => <Spinning {...props} kind="chasing-dots" />;

Spinner.propTypes = {};

export default Spinner;
