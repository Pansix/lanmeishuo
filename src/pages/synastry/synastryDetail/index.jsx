import Taro, { Component } from '@tarojs/taro'
import BaseComponent from "../../../components/BaseComponent";
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.less'
import { AtNavBar } from "taro-ui";
import { connect } from '@tarojs/redux';
import { getAscFromRecord, getImgFromRecord, getNameFromRecord, getRecord } from "../../../utils/common";
// import F2Canvas from "../../../components/f2-canvas/f2-canvas";
import F2 from '@antv/f2';
import { ossUrl } from '../../../config';

const default_atavar = ossUrl + 'upload/images/recode/male.png';
const left_arrow = ossUrl + 'upload/images/article/left_arrow.png';

@connect(({ synastryDetail }) => ({
    ...synastryDetail,
}))

export default class Index extends BaseComponent {
    config = {
        navigationBarTitleText: '合盘结果',
    };

    constructor() {
        super(...arguments)
        this.state = {}
    }

    componentDidMount() {
        let rid1 = this.$router.params.rid1;
        let rid2 = this.$router.params.rid2;

        //保存数据
        this.props.dispatch({
            type: 'synastryDetail/save',
            payload: {
                rid1: rid1,
                rid2: rid2,
            }
        });
        //请求运势数据
        this.props.dispatch({
            type: 'synastryDetail/detail',
        });
    }

    drawRadar(canvas, width, height) {

        // ⚠️ 别忘了这行
        // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
        F2Canvas.fixF2(F2);
        let data = this.props.data;
        let sign = 10;
        const canvas_data = [
            { name: '吸引', value: Number(data.score.attract.num) / sign },
            { name: '亲密', value: Number(data.score.chat.num) / sign },
            { name: '沟通', value: Number(data.score.passion.num) / sign },
            { name: '愉悦', value: Number(data.score.benefit.num) / sign },
            { name: '激情', value: Number(data.score.happy.num) / sign },
            { name: '风缘', value: Number(data.score.probTobeLover.num) / sign }
        ];
        const chart = new F2.Chart({
            el: canvas,
            width,
            height
        });
        chart.source(canvas_data, {
            value: {
                min: 0,
                max: 10
            }
        });
        chart.coord('polar');
        chart.axis('value', {
            grid: {
                lineDash: null,
                type: 'arc' // 弧线网格
            },
            label: null,
            line: null
        });
        chart.axis('name', {
            grid: {
                lineDash: null
            }
        });
        chart.area()
            .position('name*value')
            .color('#6C5FD3')
            .style({
                fillOpacity: 0.59
            })
            .animate({
                appear: {
                    animation: 'groupWaveIn'
                }
            });
        chart.line()
            .position('name*value')
            .color('#6C5FD3')
            .size(1)
            .animate({
                appear: {
                    animation: 'groupWaveIn'
                }
            });
        chart.point().position('name*value').color('#6C5FD3').animate({
            appear: {
                delay: 300
            }
        });
        chart.guide().text({
            position: ['50%', '50%'],
            content: '',
            style: {
                fontSize: 32,
                fontWeight: 'bold',
                fill: '#6C5FD3'
            }
        });
        chart.render();
    }

    initChart(canvas, width, height) {
        F2Canvas.fixF2(F2);
        let data = this.props.data;
        const canvas_data = [
            { "year": 2010, "type": data.name1, "value": data.score1.grow },
            { "year": 2010, "type": data.name2, "value": data.score2.grow },
            { "year": 2011, "type": data.name1, "value": data.score1.substance },
            { "year": 2011, "type": data.name2, "value": data.score2.substance },
            { "year": 2012, "type": data.name1, "value": data.score1.care },
            { "year": 2012, "type": data.name2, "value": data.score2.care },
            { "year": 2013, "type": data.name1, "value": data.score1.motivate },
            { "year": 2013, "type": data.name2, "value": data.score2.motivate },
            { "year": 2014, "type": data.name1, "value": data.score1.relieved },
            { "year": 2014, "type": data.name2, "value": data.score2.relieved },
            { "year": 2015, "type": data.name1, "value": data.score1.luck },
            { "year": 2015, "type": data.name2, "value": data.score2.luck },
        ];

        const chart = new F2.Chart({
            el: canvas,
            width,
            height
        });

        chart.source(canvas_data, {
            year: {
                range: [0, 1],
                ticks: [2010, 2011, 2012, 2013, 2014, 2015]
                // ticks: ['成长','物质','关爱','激励','安全','幸运']
            },
            value: {
                tickCount: 10,
                formatter(val) {
                    return val.toFixed(1) + '';
                }
            }
        });
        chart.tooltip(false);
        chart.line().position('year*value').shape('smooth').color('type', val => {
            if (val === data.name1) {
                return '#6C5FD2';
            } else {
                return '#FF83A5'
            }
        });
        chart.area().position('year*value').shape('smooth').color('type', val => {
            if (val === data.name1) {
                return '#6C5FD2';
            } else {
                return '#FF83A5'
            }
        });

        chart.render();
        return chart;
    }
    //关系详解 被点击
    actionRelationExplain = () => {
        Taro.navigateTo({ url: '/pages/synastry/relationExplain/index' })
    }

    render() {
        const { data, rid1, rid2 } = this.props;
        let obj = {
            array: [1, 2]
        }
        let record1;
        let record2;
        if (rid1) {
            record1 = getRecord(rid1);
        }
        if (rid2) {
            record2 = getRecord(rid2);
        }

        let relations = [];
        if (data && data.score) {
            data.score.attract.title = '吸引';
            relations.push(data.score.attract);
            data.score.chat.title = '亲密';
            relations.push(data.score.chat);
            data.score.passion.title = '沟通';
            relations.push(data.score.passion);
            data.score.benefit.title = '愉悦';
            relations.push(data.score.benefit);
            data.score.happy.title = '激情';
            relations.push(data.score.happy);
            data.score.probTobeLover.title = '缘分';
            relations.push(data.score.probTobeLover);
        }
        let persent = '';
        if (data) {
            for (let i = 0; i < data.relation.length; i++) {
                let num = Number(data.relation[i].per) * 100;
                let persent = String(num).substring(0, 2);
                data.relation[i].per = persent;
            }
        }
        // console.log('数据data---' + JSON.stringify(data.relation))
        return (
            <View>
                {data && (
                    <View className='synastry-detail-page'>
                        {/*顶部*/}
                        <View className='header'>
                            {/*返回按钮*/}
                            <View className='backNavBar' onClick={this.actionNavBack}>
                                <Image className='left_arrow' src={left_arrow}></Image>
                            </View>
                            <View className='title'>
                                合盘结果
                            </View>
                        </View>
                        <View className="top-con">
                            {/*档案1 vs 档案2 部分*/}
                            <View className="vs-con">
                                <View className='item-con'>
                                    <Image className='img' src={getImgFromRecord(record1, default_atavar, false)}></Image>
                                    <View className='name'>{getNameFromRecord(record1)}</View>
                                    <View className='asc'>{getAscFromRecord(record1)}</View>
                                </View>
                                <View className='vs-text'>Vs</View>
                                <View className='item-con text-align-right'>
                                    <Image className='img' src={getImgFromRecord(record2, default_atavar, false)}></Image>
                                    <View className='name'>{getNameFromRecord(record2)}</View>
                                    <View className='asc'>{getAscFromRecord(record2)}</View>
                                </View>

                            </View>
                            {/*进度条部分*/}
                            <View className='progress-con'>
                                <View className='percent-con'>
                                    <View className='left-bg' style={`width:${data.harmoniousAndConflict[0]}%;`}>{data.harmoniousAndConflict[0]}%</View>
                                    <View className='right-bg' style={`width:${data.harmoniousAndConflict[1] + 10}%;`}>{data.harmoniousAndConflict[1]}%</View>
                                </View>
                                <View className="des">
                                    <View className='left-des'>和谐</View>
                                    <View className='right-des'>冲突</View>
                                </View>
                            </View>
                            {/*如果部分*/}
                            <View className='if-content-con'>
                                <View className='title'>{data.is_love_status == 1 ? '如果相处' : '假如恋爱'}</View>
                                <View className='content'>{data.if_love}</View>
                            </View>
                        </View>
                        {/*关系滑动*/}
                        <View className='relation_scroll'>
                            <ScrollView
                                className='scrollview'
                                scrollX
                                scrollWithAnimation
                                onScroll={this.onScroll}
                            >
                                {data && data.relation && data.relation.length > 0 && data.relation.map((item, index) => (
                                    <View className='relation' key={index}>
                                        <View className="title">{index == 0 ? '最合适的关系' : '适合的关系'}</View>
                                        <View className="rel-con">
                                            <View className="info">
                                                <View className="rel">{item.name_cn}</View>
                                                <View className="des">关系概率</View>
                                            </View>
                                            <View className="num">{item.per}%</View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View className="detail">
                            <View className="title">关系发展潜力</View>
                            {/*图表部分*/}
                            {/* {data && (
                                <View className='graph-con'>
                                    <F2Canvas onCanvasInit={this.drawRadar.bind(this)}></F2Canvas>
                                </View>
                            )} */}
                            {/*吸引、亲密。。部分*/}
                            <View className='items-con'>
                                {relations.map((item, index) => (
                                    <View className='item-con' key={index}>
                                        <View className='sub-title'>{item.title}</View>
                                        <View className='right-con'>
                                            <View className='score'>{item.num}</View>
                                            <View className='des'>{item.text}</View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View className="comment">
                            <View className="title">整体评价</View>
                            {/*立足点*/}
                            <View className='content-con'>
                                <View className='judje-title-con'>
                                    <View className='left-bg' style='border: 3px solid #6C5FD2;'></View>
                                    <View className='judje-title'>立足点</View>
                                </View>
                                {data.foothold.map((item, index) => (
                                    <View className='item-con' key={index}>
                                        <View className='content'>{index + 1}.{item}</View>
                                    </View>
                                ))}
                            </View>

                            {/*矛盾点*/}
                            <View className='content-con'>
                                <View className='judje-title-con'>
                                    <View className='left-bg' style='border: 3px solid #FF83A5;'></View>
                                    <View className='judje-title'>矛盾点</View>
                                </View>
                                {data.conflict.map((item, index) => (
                                    <View className='item-con' key={index}>
                                        <View className='content'>{index + 1}.{item}</View>
                                    </View>
                                ))}
                            </View>


                            {/*双方在关系中的收获*/}
                            <View className='get-content-con'>
                                <View className='graph-con'>
                                    {/*图表部分*/}
                                    {/* <View className='top-con'>
                                        <F2Canvas onCanvasInit={this.initChart.bind(this)}></F2Canvas>
                                    </View> */}
                                </View>
                            </View>
                        </View>

                        <View className="more-btn">
                            <View className='text' onClick={this.actionRelationExplain}>查看更多详细内容</View>
                        </View>
                    </View>
                )
                }
            </View>
        )
    }
}