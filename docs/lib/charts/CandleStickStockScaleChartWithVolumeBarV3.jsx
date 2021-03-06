"use strict";

import React from "react";
import PropTypes from 'prop-types';
import { format } from "d3-format";

import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";


var { CandlestickSeries, BarSeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { XAxis, YAxis } = axes;

var { fitWidth } = helper;

class CandleStickStockScaleChartWithVolumeBarV3 extends React.Component {
	render() {
		var { data, type, width, ratio } = this.props;

		return (
			<ChartCanvas ratio={ratio} width={width} height={600}
					margin={{left: 50, right: 50, top:10, bottom: 30}} type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[new Date(2012, 0, 1), new Date(2012, 6, 2)]}>
				<Chart id={1} height={400} yExtents={d => [d.high, d.low]} >
					<YAxis axisAt="right" orient="right" ticks={5} />
					<XAxis axisAt="bottom" orient="bottom" showTicks={false}/>
					<CandlestickSeries />
				</Chart>
				<Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".0s")}/>
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
				</Chart>
			</ChartCanvas>
		);
	}
}
CandleStickStockScaleChartWithVolumeBarV3.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChartWithVolumeBarV3.defaultProps = {
	type: "svg",
};
CandleStickStockScaleChartWithVolumeBarV3 = fitWidth(CandleStickStockScaleChartWithVolumeBarV3);

export default CandleStickStockScaleChartWithVolumeBarV3;
