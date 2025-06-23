const Post = require("../models/Post");

const createPost = async (req, res) => {
  try {
    const { title, subtitle, content, tags} = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Kullanıcı doğrulanamadı." });
    }

    if ((!title && !subtitle && !content && !tags))
      return res.status(400).json({ message: "Tüm Alanlar Zorunludur" });
    if (!req.file)
      return res.status(400).json({ message: "Görsel Yüklenmedi" });

    const image = req.file.filename


    const newPost = new Post({ title, subtitle, content, image, tags, user: req.user.id });
    const savedPost = await newPost.save();


    res.status(201).json( {savedPost, message: "Post Oluşturuldu" });
  } catch (error) {
    
    res.status(500).json({ message: `Sunucu Hatası ${error}` }); 
  }
};
 
const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("GET MY POSTS ERROR:", error);
    res.status(500).json({ message: "Sunucu Hatası", error });
  }
};


 

const getAllPost = async (req, res) => {
  try {

    const {tags} = req.query
    let filter = {}

    if (tags) {
      filter.tags = tags
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `Sunucu Hatası ${error}` });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post Bulunamadı" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: `Sunucu Hatası ${error}` });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content,  tags } = req.body;

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { title, subtitle, content,  tags },
      { new: true, runValidators: true }
    );

    if (!updatePost)
      return res.status(404).json({ message: "Post bulunamadı" });

    res.status(200).json( {updatePost, message: "Post Güncellendi" });
  } catch (error) {}
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findByIdAndDelete(id);

    if (!deletePost)
      return res.status(404).json({ message: "Post Bulunamadı" });

    res.status(200).json(deletePost, { message: "Post Silindi" });
  } catch (error) {}
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts,
};
