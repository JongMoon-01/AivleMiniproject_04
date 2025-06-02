import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import books from "../data/books"

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Box,
  Button
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookDetail() {
  const { id } = useParams(); // 도서 ID
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ 이 줄이 필요합니다!
  const navigate = useNavigate();

  useEffect(() => {
  const fetchBookAndPost = async () => {
    try {
      const postRes = await axiosInstance.get(`/api/posts/${id}`);
      setPost(postRes.data);
      console.log("✅ 서버에서 받은 post", postRes.data);  // 🔥 이 줄 추가
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchBookAndPost();
}, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Header />
      <Box sx={{ flex: 1 }}>
      {post ? (
        <div>
        <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
         {post.coverImageUrl ? (<CardMedia
            component="img"
            sx={{ width: 200, height: 300, objectFit: "cover", borderRadius: 1 }}
            image={post.coverImageUrl}
            alt={post.title}
          />) : (
            <Box
              sx={{
                width: 200,
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f0f0f0",
                color: "#999",
                fontSize: "1rem",
                borderRadius: 1,
                border: "1px solid #ccc"
              }}
            >
              이미지 없음
            </Box>
          )}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {post.subtitle}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {post.comment}
          </Typography>
        </Paper>
        </Card> 
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {post.content}
          </Typography>
          </div>
      ) : (
        <Typography variant="body2" sx={{ mt: 4, color: "gray" }}>
          관련된 도서가 없습니다.
        </Typography>
      )}
      </Box>


      <Footer />

    </Container>
  );
}

export default BookDetail;