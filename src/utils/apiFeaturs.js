export class ApiFeaturs {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

    /*1-pagination*/
    paginate() {
        let page = this.queryString.page * 1 || 1;
        if (this.queryString.page <= 0) page = 1;
        let skip = (page - 1) * 5;
        this.page = page;
        this.mongooseQuery.skip(skip).limit(5);
        return this; //for chain
    }

    /*2-filterition*/
  filter() {
        let filter = { ...this.queryString }
        let excludeQuery = ["page", "sort", "fields", "keyword"]
        excludeQuery.forEach((q) => {
        delete filter[q]
        })
        filter = JSON.stringify(filter);
        filter = filter.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        filter = JSON.parse(filter);
        this.mongooseQuery.find(filter);
        return this;
    }

  /*3-sorting*/
    sort() {
        if (this.queryString.sort) {
            let sortedBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }

  /*4-search*/
  search() {
    if (this.queryString.keyword) {
      mongooseQuery.find({
        $or: [
            {title: {$regex: this.queryString.keyword,$option: "i" /*insensive find capital or small*/,},},
            { description: { $regex: this.queryString.keyword, $option: "i" } },
        ],
      });
    }
    return this;
  }

    /*5-selected*/
    select(){
        if(this.queryString.fields){
            let sortedBy = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery.select(sortedBy);
        }
        return this
    }
}
