import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

export default class PieChart extends Component {

  static propTypes = {
    currentTagId: PropTypes.func.isRequired,
    formatTags: PropTypes.array.isRequired,
    currentIndex: PropTypes.string.isRequired,
  };

  render() {
    const { DataView } = DataSet;
    const data = this.props.formatTags;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = `${(val * 100).toFixed(2)}%`;
          return val;
        },
      },
    };
    return (
      <Chart height={228} data={dv} scale={cols} padding={[10]} style={{ cursor: 'pointer' }} onPlotClick={ev => {
        this.props.currentTagId(ev.data && ev.data._origin ? ev.data._origin.id : '', this.props.currentIndex);
      }}>
        <Coord type="theta" radius={0.85} />
        <Axis name="percent" />
        <Legend position="right" offsetX={-100} offsetY={-60} />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*count',
            (item, count) => {
              return {
                name: item,
                value: `文章数量(${count})`,
              };
            },
          ]}
          style={{
            lineWidth: 1,
            stroke: '#fff',
            cursor: 'pointer',
          }}
        >
          <Label
            content={['count', (count) => {
              return `${count}篇`;
            }]}
            offset={-40}
            textStyle={{
              rotate: 0,
              textAlign: 'center',
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            }}
          />
        </Geom>
      </Chart>
    );
  }
}
