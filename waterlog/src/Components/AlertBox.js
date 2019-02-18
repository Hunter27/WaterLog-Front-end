import React from 'react';

function highStatus() {
	return (
		<svg width="15" height="15">
			<rect x="0" y="0" width="15" height="15" style={{ fill: '#ff1744' }} />
			Sorry, your browser does not support inline SVG.
		</svg>
	);
}

function mediumStatus(props) {
	return (
		<svg width="15" height="15">
			<rect x="0" y="0" width="15" height="15" style={{ fill: '#ffab00'}} />
			Sorry, your browser does not support inline SVG.
		</svg>
	);
}

function lowStatus(props) {
	return (
		<svg width="15" height="15">
			<rect x="0" y="0" width="15" height="15" style={{ fill: '#ffea00' }} />
			Sorry, your browser does not support inline SVG.
		</svg>
	);
}

export const HighStatusIcon = highStatus;
export const MediumStatusIcon = mediumStatus;
export const LowStatusIcon = lowStatus;
