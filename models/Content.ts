class Content {

  id: string;
  title: string;
  category?: string;
  global_description: string;
  released_date: Date;
  poster?: string;
  url: string;
  available_country?: string[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  
    constructor(id: string, title: string, global_description: string, released_date:Date, url: string, createdAt: Date, updatedAt: Date, category?: string, available_country?: string[], active?: boolean, poster?: string) {
            this.id = id;
            this.title = title;
            this.category = category;
            this.global_description = global_description;
            this.released_date = released_date;
            this.url = url;
            this.poster = poster;
            this.available_country = available_country;
            this.active = active;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
    }

}
export default Content;