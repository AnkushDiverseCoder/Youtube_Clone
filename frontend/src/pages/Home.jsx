import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import api from "../api/API";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const {currentUser} = useSelector(state=>state.user)

  useEffect(() => {
    const fetchVideos = async () => {
     if(type === "sub"){
       const res = await api.post(`/videos/${type}`,{token:currentUser?currentUser.token:""});
       setVideos(res.data);
     }else{
       const res = await api.get(`/videos/${type}`);
       setVideos(res.data);
     }
    }
    fetchVideos()
  }, [ type ,currentUser ])

  return (
    <Container>
      {videos.map(video => (
        <Card key={video._id} video={video} />
      ))
      }
    </Container>
  );
};

export default Home;
