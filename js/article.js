var request = new GetRequest();
if(!request.createTime){
    request.createTime = ""
}
if(null == request["type"]){
    request["type"] = "newest";
}
if(null == request["id"]){
    if(null == request.title){
        request.title =  request["type"];
    }
    request.title = decodeURIComponent(decodeURIComponent(request.title));
    document.title =  request.title + "|" + document.title;
    $('#title').html( drawing($('#title').html(), request))

    list(request["type"]);
}

if(null != request["outCode"]){
  /*  $.ajax({
        url : "http://67933.site.booen.com/article.php?articleLabel=" + request["outCode"],
        type : "get",
        success : function(data) {
            console.log(data)
        }});*/

}else if(null != request["id"]){
    request.title = decodeURIComponent(decodeURIComponent(request.title));
    document.title =  request.title + "|" + document.title;
    $('#title').html( drawing($('#title').html(), request))
    $('#article-content').load( base + formatString2Map("/article/({type})/({id}).html", request));
}


function list(type){

    load(formatString2Array("/json/%s.json",  type), $('[js-do="newest-content"]'), {
        rowFilter:function(dom, row){
            var dom = $(dom);
            dom.find(".viewnum").remove();
            dom.find(".pingl").remove();
            if(null == row["image"] || "" == row["image"]){
                dom.find("figure").remove();
                return dom.prop('outerHTML').replace('col-lg-9 col-md-9', 'col-lg-12 col-md-12')
            }

            return dom.prop('outerHTML');
        },
        befor: function (row, data) {
            row["image"] = base + row["image"];
            row["url"] = base + formatString2Array("%s?type=%s&id=%s&title=%s&createTime=%s", data.url, data.type, row.id, encodeURIComponent(encodeURIComponent(row.title)), row.createTime)
            return row;
        }
    })
}
