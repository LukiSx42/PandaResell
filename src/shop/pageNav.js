import './style/pageNav.css';

function PageNav(props) {
    return (
        <div className="multi-button">
            <button onClick={ (props.current > 0) ? props.prevPage : () => {} }>«</button>
            <button>{ props.current+1 } / { props.max }</button>
            <button onClick={ (props.current+1 < props.max) ? props.nextPage : () => {} }>»</button>
        </div>
    );
};

export default PageNav;