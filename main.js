
// 生成数据源
var i = 0;
sampleData = new Array(26).fill(undefined).map(function(){
  i += 1;
  return {
    key: String.fromCharCode(64+i),
    value: Math.random()*80+10
  }
})


// 准备svg布局参数
var margin = {
  top: 20,
  left: 40,
  bottom: 20,
  right: 0
}

var barChart = d3.select('#bar-chart')

var width = barChart.attr('width') - margin.left - margin.right;
var height = barChart.attr('height') - margin.top - margin.bottom;

var _data = sampleData;

// 生成x轴比例尺
//
var xScale = d3.scaleBand()
           .domain(_data.map(function(d){
             return d.key
           }))
           .range([0, width])
           .padding(0.5)


// 生成y轴比例尺
var maxValue = d3.max(_data, function(d){  // 获取数据源最大值
  return d.value
});

yScale = d3.scaleLinear()
               .domain([0, maxValue])
               .range([height, 0])


// 根据x轴比例尺生成x轴坐标系
var xAxis = d3.axisBottom(xScale);
// 根据y轴比例尺生成y轴坐标系
var yAxis = d3.axisLeft(yScale);


// 绘制坐标轴
barChart.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate('+margin.left+','+(margin.top + height)+')')
        .call(xAxis)

barChart.append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate('+ margin.left+','+margin.top+')')
        .call(yAxis);


// 绘制矩形
barChart.append('g')
        .attr('class', 'bars')
        .selectAll('rect')
        .data(_data)
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('x', function(d){
            return xScale(d.key)
        })
        .attr('y', function(d){
          return yScale(d.value);
        })
        .attr('height', function(d){
          return height - yScale(d.value);
        })
        .attr('transform', 'translate('+margin.left+','+margin.top+')')
        .attr('fill', 'steelblue')
