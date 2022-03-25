class Content {

  id: string;
  title: string;
  category: string;
  global_description: string;
  released_date: Date;
  createdAt: Date;
  updatedAt: Date;
  
    constructor(id: string, title: string, category: string, global_description: string, released_date:Date, createdAt: Date, updatedAt: Date) {
            this.id = id;
            this.title = title;
            this.category = category;
            this.global_description = global_description;
            this.released_date = released_date;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }

}
export default Content;