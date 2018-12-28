const React = require('react');
const PropTypes = require('prop-types');

const CreatedCongregation = ({ congregation }) => (
    <div>
        <p>Welcome to Territory Nexus!</p>
        <p>
            We've created an account for <strong>{congregation.name}</strong>. To get started go to {process.env.UI_URL} or
            <a href={process.env.UI_URL}>click here</a>. Once you log in, you'll be able to start using Territory Nexus.
        </p>
    </div>
);

CreatedCongregation.propTypes = {
    activationLink: PropTypes.string.isRequired,
    congregation: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    invitingUserName: PropTypes.string,
};

module.exports = CreatedCongregation;
