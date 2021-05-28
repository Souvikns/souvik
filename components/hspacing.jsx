import PropTypes from 'prop-types';
const HSpacing =  (props) => {
    const spacing = (section) => {
        if(section) return "20"

        return "10"
    }
    return <div className={`mt-${spacing(props.section)}`} />
}

HSpacing.propTypes = {
    section: PropTypes.bool
}

export default HSpacing;