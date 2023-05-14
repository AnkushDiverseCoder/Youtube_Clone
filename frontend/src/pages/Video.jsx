import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../api/API";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const RecommendationDiv = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];
  // const [video, setVideo] = useState({})
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await api.get(`/videos/find/${path}`);
        const channelRes = await api.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) { }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await api.put(`/users/like/${currentVideo?._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await api.put(`/users/dislike/${currentVideo?._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    currentUser?.subscribedUsers?.includes(channel._id)
      ? await api.put(`/users/unsub/${channel?._id}`)
      : await api.put(`/users/sub/${channel?._id}`);
    dispatch(subscription(channel._id));
  };


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img?channel.img:"data:image/jpeg;base64,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"}  />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <RecommendationDiv>
        <Recommendation tags={currentVideo?.tags} />
      </RecommendationDiv>
    </Container>
  );
};

export default Video;
