import Blog from '../models/blog.model.js';


export const createBlog = async (req, res, next)=> {
    const { title, content, topic } = req.body; 
    const userId = req.userId;
    


    try {
        const user = await user.findById(userId);
        let blog = new Blog({
            topic, title, content,user: {id: userId, name: user.name}
        });

        await blog.save();
        res.status(200).json({success: true, message: "Blog created"});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
        
    }
    
}

export const editBlog = async(req, res, next) => {
    const blogId = req.params.id;
    
    try {
        const blog = await Blog.findById(blogId);
        if(!blog) {
            return res.status(404).json({success: false, message: "Not found"});

        }
        const update = await Blog.findByIdAndUpdate(blogId, {$set: req.body}, {new: true}) 

        res.status(200).json({success: true, message: "Blog edited successfully"});


    }
    catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
}


export const deleteBlog = async(req, res, next) => {
    const id =  req.params.id;
    try {
        const blog = await Blog.findById(id);
        if(!blog) {
            return res.status(404).json({success: false, message: "Not found"});

        }
        await Blog.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Blog deleted successfully"});
         

    }
    catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
}


export const getBlog = async(req, res, next) => {
    try {
        const allBlog = await Blog.find({})
        res.status(200).json({success: true, message: "All blog found", data: allBlog}); 

    }
    catch(error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
}


export const getBlogById = async(req, res, next) => {
     const id =req.params.id;

     try {
        const blog = await Blog.findById(id);
        if(!blog) {
            return res.status(404).json({success: false, message: "Not found"});

        } 

        res.status(200).json({success :true, message: "Blog found" ,data: blog});

     }catch (error) {
        res.status(500).json({success: false, message: "Server Error"});
     }
}

