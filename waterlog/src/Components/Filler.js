import React from 'react';

const Filler = (props) => {
	const percent = props.percent + '%';
	return (
		<div className="filler" style={{ width: percent }}>
			<h3 className="percent-label">{percent}</h3>
		</div>
	);
};
export default Filler;
