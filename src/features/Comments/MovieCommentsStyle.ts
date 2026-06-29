import styled from 'styled-components';

export const CommentsBlock = styled.div`
  margin-top: 40px;
  border-top: 1px solid var(--bg-card, #1f1f27);
  padding-top: 30px;
  font-family: 'Inter', sans-serif;
`;

export const BlockTitle = styled.h3`
  font-size: 22px;
  color: var(--text-main, #fff);
  margin-bottom: 20px;
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
`;

export const CommentTextArea = styled.textarea`
  background-color: var(--bg-card, #1f1f27);
  color: var(--text-main, #fff);
  border: 1px solid #2d2d3f;
  border-radius: 8px;
  padding: 14px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: var(--accent-color, #7b61ff);
  }
`;

export const SubmitCommentBtn = styled.button`
  background-color: var(--accent-color, #7b61ff);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-hover);
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentCard = styled.div`
  background-color: #1a1a24;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #2d2d3f;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const CommentAuthor = styled.span`
  font-weight: 600;
  color: var(--accent-color, #7b61ff);
`;

export const CommentDate = styled.span`
  color: var(--text-muted, #76787d);
`;

export const CommentText = styled.p`
  margin: 0;
  color: var(--text-main, #fff);
  font-size: 15px;
  line-height: 1.5;
`;