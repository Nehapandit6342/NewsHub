import prisma from "../config/prisma.js";

// USER SIDE

export const createCommentService = async (article_id, name, comment) => {
  return await prisma.comments.create({
    data: {
      article_id: Number(article_id),
      name,
      comment,
      status: "visible",
    },
  });
};

export const getCommentsByArticleService = async (articleId) => {
  return await prisma.comments.findMany({
    where: {
      article_id: Number(articleId),
      status: "visible",
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

// ADMIN SIDE

export const getAllCommentsService = async () => {
  return await prisma.comments.findMany({
    include: {
      articles: {
        select: {
          title: true,
          image: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
};

export const updateCommentStatusService = async (id, status) => {
  return await prisma.comments.update({
    where: {
      id: Number(id),
    },
    data: {
      status,
    },
  });
};

export const deleteCommentService = async (id) => {
  return await prisma.comments.delete({
    where: {
      id: Number(id),
    },
  });
};
