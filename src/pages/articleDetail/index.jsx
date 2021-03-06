import Taro from '@tarojs/taro'
import BaseComponent from "../../components/BaseComponent";
import { View, Text, Image, Input } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { ossUrl } from "../../config";
import './index.less'
import { actionNavBack, customTime, getCustomImgUrl } from "../../utils/common";
import ItemArticleReplay from '../../components/Item/ItemArticleReplay'
import { getWindowHeight } from "../../utils/style";

const banner = ossUrl + 'upload/images/home/banner.jpg';
const share_wechat = ossUrl + 'upload/images/article/share_wechat.png';
const share_friend = ossUrl + 'upload/images/article/share_friend.png';

const heart = ossUrl + 'upload/images/home/Star_Heart.png';
const star = ossUrl + 'upload/images/home/Star_Star.png';
const chat = ossUrl + 'upload/images/home/Star_Chat.png';
const smile = ossUrl + 'upload/images/article/smile.png';
const left_arrow = ossUrl + 'upload/images/article/left_arrow.png';
const female_image = ossUrl + 'upload/images/article/female_image.png';
const face = ossUrl + 'upload/images/article/face.png';

@connect(({ articleDetail }) => ({
    ...articleDetail,
}))
export default class Detail extends BaseComponent {
    config = {
        navigationBarTitleText: '星文详情',
    };
    constructor() {
        super(...arguments)
        this.state = {
            detail: {},//文章详情
            commentResult: [],//评论列表

            loading: 1, //0：不显示加载中；1：显示加载中；2：显示没有更多了；

            is_show_input: false,//是否显示输入框
            input_content: '',

            scroll_view_height: getWindowHeight(false, true, 0),

            comment_index: '',
            comment_id: '',
            reply_name: '',
            reply_id: '',
            reply_pid: '',

        }
    }

    componentDidMount = () => {
        let articleId = this.$router.params.id;
        //设置文章id
        this.props.dispatch({
            type: 'articleDetail/save',
            payload: {
                articleId: articleId,
            },
        });
        //请求文章详情数据
        this.props.dispatch({
            type: 'articleDetail/detail',
            payload: {
                articleId: articleId,
            },
        }).then((res) => {
            this.setState({ detail: res })
        });
        //请求文章评论列表数据
        this.props.dispatch({
            type: 'articleDetail/comment_list',
            payload: {
                articleId: articleId,
                page: 1,
            },
        }).then((res) => {
            //设置数据
            let loading = this.state.loading;
            if (Number(res.data.last_page) == Number(res.data.current_page)) {//没有更多了
                loading = 2;
            } else if (Number(res.data.last_page) > Number(res.data.current_page)) {//显示加载中
                loading = 1;
            }
            this.setState({ commentResult: res.data, loading: loading })
        });
    };
    //创建des内容
    customHtmlContent() {
        return { __html: this.state.detail.content };
    }

    render() {
        const {
            commentResult,
            detail,
            loading,
            is_show_input,
            scroll_view_height,
            reply_name,
        } = this.state;
        let user = Object(detail.user)
        return (
            <View className='detail-page'>
                {/*返回按钮*/}
                <View className='backNavBar' onClick={this.actionNavBack}>
                    <Image className='left_arrow' src={left_arrow}></Image>
                </View>
                <View className="top">
                    <View className="header">
                        <View className="title">{detail.title}</View>
                        <View className="author">
                            <Text className="name">{user.nickname}</Text>
                            <Text className="time">{detail.created_at}</Text>
                        </View>
                        <View className="art-img">
                            <Image className='img' src={ossUrl + detail.img}></Image>
                        </View>
                        <View className='flabel'>
                            <View className="label">太阳或上升再白羊座</View>
                        </View>
                    </View>
                    <View className="container">
                        {/*文章详情*/}
                        {detail && (
                            <View
                                className='content'
                                dangerouslySetInnerHTML={this.customHtmlContent()}
                            />
                        )}
                        {/*分享点赞喜欢*/}
                        <View className="event">
                            <View className="share">
                                <Image className='img' src={share_wechat}></Image>
                                <Image className='img' src={share_friend}></Image>
                            </View>
                            <View className="tab">
                                <View className="item">
                                    <Image className='icon' src={heart}></Image>
                                    <Text className='text'>{detail.watch}</Text>
                                </View>
                                <View className="item">
                                    <Image className='icon' src={star}></Image>
                                    <Text className='text'>{detail.watch}</Text>
                                </View>
                                <View className="item">
                                    <Image className='icon' src={chat}></Image>
                                    <Text className='text'>{detail.watch}</Text>
                                </View>
                            </View>
                        </View>
                        <View className="line"></View>
                    </View>
                    {/*评论*/}
                    <View className='comment'>
                        <View className='comment-left'>
                            <Image className='img' src={female_image}></Image>
                        </View>
                        <View className='comment-right'>
                            <Text className='name'>白日梦想家</Text>
                            <Text className='date'>3分钟前</Text>
                            <View className='content'>
                                <View className='text'>跪求桃花运！呜呜呜！</View>
                                <View className='like-reply'>
                                    <View className='like'>
                                        <Image className='icon' src={heart}></Image>
                                        <Text className='text'>3</Text>
                                    </View>
                                    <View className='all-reply'>
                                        <Image Image className='icon' src={chat}></Image>
                                        <Text className='text'>1</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='reply'></View>
                        </View>
                    </View>

                    <View className='comment'>
                        <View className='comment-left'>
                            <Image className='img' src={female_image}></Image>
                        </View>
                        <View className='comment-right'>
                            <Text className='name'>白日梦想家</Text>
                            <Text className='date'>3分钟前</Text>
                            <View className='content'>
                                <View className='text'>跪求桃花运！呜呜呜！</View>
                                <View className='like-reply'>
                                    <View className='like'>
                                        <Image className='icon' src={heart}></Image>
                                        <Text className='text'>3</Text>
                                    </View>
                                    <View className='all-reply'>
                                        <Image Image className='icon' src={chat}></Image>
                                        <Text className='text'>1</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='reply'></View>
                        </View>
                    </View>

                    <View className='comment'>
                        <View className='comment-left'>
                            <Image className='img' src={female_image}></Image>
                        </View>
                        <View className='comment-right'>
                            <Text className='name'>白日梦想家</Text>
                            <Text className='date'>3分钟前</Text>
                            <View className='content'>
                                <View className='text'>跪求桃花运！呜呜呜！</View>
                                <View className='like-reply'>
                                    <View className='like'>
                                        <Image className='icon' src={heart}></Image>
                                        <Text className='text'>3</Text>
                                    </View>
                                    <View className='all-reply'>
                                        <Image Image className='icon' src={chat}></Image>
                                        <Text className='text'>1</Text>
                                    </View>
                                </View>
                            </View>
                            <View className='reply'></View>
                        </View>
                    </View>
                    
                </View>
                <View className='bottom'>
                    <View className='content'>
                        <View className="reply-input">
                            <Input className='input' type='text' placeholder='写评论' placeholderStyle='color: rgba(49, 56, 54, 0.3)' />
                        </View>
                        <View className="face">
                            <Image className='img' src={face}></Image>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
