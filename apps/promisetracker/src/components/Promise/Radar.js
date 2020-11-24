import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import 'leaflet/dist/leaflet.css';

import dynamic from "next/dynamic";
import config from "@/promisetracker/config";
const HurumapUIMapIt = dynamic(() => import("@hurumap-ui/core/MapIt"), {
	ssr: false,
});

const useStyles = makeStyles(({ typography, breakpoints }) => ({
	root: {
		alignItems: "center",
		display: "flex",
		marginBottom: "2rem",
	},

	radar: {
		width: "100%",
		objectFit: "cover",
		height: typography.pxToRem(256),
		[breakpoints.up("lg")]: {
			width: typography.pxToRem(256),
		},
	},
}));

function Radar(props) {
	const classes = useStyles({ ...props });
	const { MAPIT_URL } = config;
	return (
		<div className={classes.root}>
			<HurumapUIMapIt
				height="50vh"
				width="100%"
				url={MAPIT_URL}
				zoom={3}
				tolerance={0.001}
				center={[8.7832, 34.5085]}
				drawProfile={true}
				drawChildren={true}
				codeType="KEN"
				geoLevel="country"
				geoCode="KE"
				geoLayerBlurStyle={{
					color: "black",
					fillColor: "#ccc",
					weight: 1,
					opacity: 0.3,
					fillOpacity: 0.3
				}}
				{...props}
			/>
		</div>
	);
}

export default Radar;
