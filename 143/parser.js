const ar = require("./parserObject").articles
const fs = require("fs")
const xmlParser = require("xml2json")
const formatXml = require("xml-formatter")

fs.readFile("./rss.xml", function (err, data) {
  const xmlObj = xmlParser.toJson(data, { reversible: true, object: true })
  const stringifiedXmlObj = JSON.stringify(xmlObj)
  const finalXml = xmlParser.toXml(stringifiedXmlObj)

  const keys = Object.keys(ar)
  let objArr = []
  keys.forEach(key => {
    ar[key].forEach(article => {
      const item = {
        item: {
          title: article.title,
          link: article.link,
          description: article.description.join(" "),
          author: article.author,
          enclosure: { url: article.imgUrl, type: "image/jpg" },
        },
      }
      objArr.push(item)
    })
  })

  objArr.forEach(object => {
    xmlObj["rss"]["channel"] = Object.assign(xmlObj["rss"]["channel"], object)
  })
  console.log(xmlObj["rss"]["channel"])

  // fs.writeFile(
  //   "./rss.xml",
  //   formatXml(finalXml, { collapseContent: true }),
  //   function (err, result) {
  //     if (err) {
  //       console.log("err")
  //     } else {
  //       console.log("Xml file successfully updated.")
  //     }
  //   }
  // )
})
