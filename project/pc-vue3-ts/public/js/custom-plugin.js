// custom-plugin.js
function customPlugin(hook, vm) {
  console.log("执行了");
  hook.init(function () {
    // 在初始化时调用后端API，获取Markdown内容
    fetch("http://127.0.0.1:12345/pcadmin/set/markdown/list",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 根据实际情况设置请求头
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6MSwicm9sZV9pZCI6MSwiZ3JvdXBfaWQiOjIsImlhdCI6MTcwNTgxODA4MiwiZXhwIjoxNzM3MzU0MDgyfQ.iXYMt-e8mS9_gfcg8TDL7hSt5MWA2nd0LYfAfDJOAxA"
        },
        body: JSON.stringify({ 
          pageNum:1,
          pageSize:10,
          classId:2
         }),
      })
      .then(async (response) => {
        // console.log('请求的response',await response.text())
        const res = await response.json()
        console.log('res.data.list[0]',res.data.list[0].content)
        return res.data.list[0].content
      })
      .then((markdownContent) => {
        // 将Markdown内容插入到Docsify页面
        document.getElementById("main").innerHTML = markdownContent;
      });

    // 获取左侧目录结构数据
    fetch("http://127.0.0.1:12345/pcadmin/set/markdownClass/list", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 根据实际情况设置请求头
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6MSwicm9sZV9pZCI6MSwiZ3JvdXBfaWQiOjIsImlhdCI6MTcwNTgxODA4MiwiZXhwIjoxNzM3MzU0MDgyfQ.iXYMt-e8mS9_gfcg8TDL7hSt5MWA2nd0LYfAfDJOAxA"
      },
      body: JSON.stringify({  }),
    })
      .then(async (response) => {
        console.log('请求的response',await response.json())
        // const res = await response.json()
        // console.log('res.data.list[0]',res.data.list[0].content        )
        // return res.data.list[0].content
        const res = [
          {
            "text": "Category1",
            "children": [
              {
                "text": "Subcategory 1.1",
                "link": "/category1/subcategory1-1.md"
              },
              {
                "text": "Subcategory 1.2",
                "link": "/category1/subcategory1-2.md"
              }
            ]
          },
          {
            "text": "Category2",
            "link": "/category2.md"
          },
          // 可以有更多的分类...
        ]
        return res;
      })
      .then((directoryData) => {
        // 将左侧目录结构数据设置为Docsify的侧边栏
        vm.config.loadSidebar = true;
        vm.config.sidebar = directoryData;

        // 监听左侧目录点击事件
        document.getElementById('sidebar').addEventListener('click', function (event) {
          // 判断点击的元素是否是链接
          if (event.target.tagName === 'A') {
            // 阻止默认行为，即不跳转到链接
            event.preventDefault();

            // 获取点击的链接的href
            const link = event.target.getAttribute('href');

            // 请求右侧Markdown内容
            fetch('your-markdown-content-api-endpoint', {
              method: 'POST', // 或其他适当的请求方法
              headers: {
                'Content-Type': 'application/json', // 根据实际情况设置请求头
              },
              body: JSON.stringify({ link }),
            })
              .then(response => response.text())
              .then(markdownContent => {
                // 将Markdown内容插入到Docsify页面
                document.getElementById('main').innerHTML = markdownContent;
              });
          }
        });
        
      });

    // // 获取右侧Markdown文件的标签数据
    // fetch("your-markdown-tags-api-endpoint", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json', // 根据实际情况设置请求头
    //   },
    //   body: JSON.stringify({  }),
    // })
    //   .then((response) => response.json())
    //   .then((tagsData) => {
    //     // 将右侧Markdown文件的标签数据设置为Docsify的标签
    //     vm.config.subMaxLevel = 2; // 设置右侧标签的最大级别
    //     vm.config.subMaxLevel = tagsData;
    //   });
  });
}
