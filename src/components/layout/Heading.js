import PropTypes from "prop-types";

export function Heading({ title }) {
    return <h1>{title}</h1>;
}

export function Subheading({ title }) {
    return <h2>{title}</h2>
}

Heading.propTypes = {
    title: PropTypes.string,
};

Subheading.propTypes = {
    title: PropTypes.string,
};