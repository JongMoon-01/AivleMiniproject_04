import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function BookDetail() {
  const { id } = useParams(); // 도서 ID
  const [book, setBook] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ 이 줄이 필요합니다!
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      // DELETE /books/{id}
      //await axios.delete(`/books/${id}`);

      // DELETE /posts/{id}
      //await axios.delete(`/posts/${id}`);

      //alert("도서 및 감성글이 삭제되었습니다.");
      navigate("/"); // 예: 도서 목록으로 이동
    } catch (error) {
      console.error("삭제 오류:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // useEffect(() => {
  //   const fetchBookAndPost = async () => {
  //     try {
  //       const bookRes = await axios.get(`/books/${id}`);
  //       const postRes = await axios.get(`/posts/${id}`); // 또는 `/api/v1/books/${id}/posts`

  //       setBook(bookRes.data);
  //       setPost(postRes.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBookAndPost();
  // }, [id]);

    useEffect(() => {
    const fetchMockData = async () => {
      try {
        const [bookRes, postRes] = await Promise.all([
          fetch('/mock/book.json'),
          fetch('/mock/post.json')
        ]);

        const bookData = await bookRes.json();
        const postData = await postRes.json();

        setBook(bookData);
        setPost(postData);
      } catch (err) {
        console.error("Mock 데이터 로딩 실패", err);
        setError("Mock 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMockData();
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
      <Header/>
      {/* <SidebarFilter/> */}

      {book ? (
        <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 4 }}>
          {book.coverImageUrl ? (<CardMedia
            component="img"
            sx={{ width: 200, height: 300, objectFit: "cover", borderRadius: 1 }}
            image={book.coverImageUrl}
            alt={book.title}
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
          
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" gutterBottom>
                {book.title}
              </Typography>
              <Typography color="text.secondary">
                카테고리: {book.category}
              </Typography>
              <Typography color="text.secondary">
                태그: {book.tag}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                등록일: {book.createdAt || "정보 없음"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                수정일: {book.updatedAt || "정보 없음"}
              </Typography>
            </CardContent>

            {/* 버튼 그룹 */}
            <Box sx={{ p: 2, display: "flex", gap: 1 }}>
              <Button variant="outlined" size="small" onClick={() => navigate(`/books/register`)}>수정</Button>
              <Button variant="outlined" size="small" color="error" onClick={handleDelete}>삭제</Button>
            </Box>
          </Box>
        </Card>
      ) : (
        <Paper sx={{ py: 10, textAlign: "center", color: "gray" }}>
          <Typography variant="h6">도서 정보를 찾을 수 없습니다.</Typography>
          <Typography variant="body2">
            해당 도서가 삭제되었거나 존재하지 않을 수 있습니다.
          </Typography>
        </Paper>
      )}
      <Box sx={{ flex: 1 }}>
      {post ? (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {post.subtitle}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {post.content}
          </Typography>

          {post.recommendation && (
            <Box mt={3} p={2} bgcolor="#e3f2fd" borderLeft="4px solid #2196f3">
              <Typography variant="body2" color="primary">
                📘 추천 도서: {post.recommendation}
              </Typography>
            </Box>
          )}
        </Paper>
      ) : (
        <Typography variant="body2" sx={{ mt: 4, color: "gray" }}>
          관련된 감성글이 없습니다.
        </Typography>
      )}
      </Box>


      <Footer/>

    </Container>
  );
}

export default BookDetail;