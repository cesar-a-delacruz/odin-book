const CRUDController = require("./CRUDController.js");

module.exports = class CommentController extends CRUDController {
  findAllByUser = async (req, res) => {
    try {
      const username = req.params.username || req.user.username;
      const rows = await this.repository.findAllByUser(username, req.query.q);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
  findAllByPost = async (req, res) => {
    try {
      const rows = await this.repository.findAllByPost(
        req.params.postId,
        req.query.q,
      );

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
};
