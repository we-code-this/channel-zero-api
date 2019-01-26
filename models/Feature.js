import Article from "./Article";
import Model from "./Model";
import Video from "./Video";

class Feature extends Model {
  constructor(data) {
    super(data);

    this.article = new Article({
      id: data.article_id,
      url: data.article_url,
      title: data.article_title,
      summary: data.article_summary,
      published: data.article_published,
      created_at: data.created_at,
      updated_at: data.updated_at
    });

    this.video = new Video({
      id: data.video_id,
      src: data.video_src,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }
}

export default Feature;
