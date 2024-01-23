function customPlugin(hook, vm) {
    console.log("执行了");
    hook.init(async function () {
        try {
        // 等待DOM加载完成
        await new Promise(resolve => {
            if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
            } else {
            resolve();
            }
        });
        // 获取左侧目录结构数据
        const responseDirectory = await fetch('http://127.0.0.1:12345/pcadmin/set/markdownClass/list', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // 根据实际情况设置请求头
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6MSwicm9sZV9pZCI6MSwiZ3JvdXBfaWQiOjIsImlhdCI6MTcwNTgxODA4MiwiZXhwIjoxNzM3MzU0MDgyfQ.iXYMt-e8mS9_gfcg8TDL7hSt5MWA2nd0LYfAfDJOAxA"
            },
            body: JSON.stringify({  }),
        });
        const res = await responseDirectory.json()
        console.log('res',res)
        const directoryData = res.data.map((item)=>{
            console.log('item.name',item.name)
            return {
                text:item.name,
                link:item.path
            }
        })
        // const directoryData = async ()=>{
        //     console.log('await responseDirectory.json();',await responseDirectory.json())
        //     const res = [
        //         {
        //           "text": "Category1",
        //           "children": [
        //             {
        //               "text": "Subcategory 1.1",
        //               "link": "/category1/subcategory1-1.md"
        //             },
        //             {
        //               "text": "Subcategory 1.2",
        //               "link": "/category1/subcategory1-2.md"
        //             }
        //           ]
        //         },
        //         {
        //           "text": "Category2",
        //           "link": "/category2.md"
        //         },
        //         // 可以有更多的分类...
        //     ]
        //     return res;
        // }

        // 将左侧目录结构数据设置为Docsify的侧边栏
        vm.config.loadSidebar = true;
        vm.config.sidebar = directoryData;

        // 监听左侧目录点击事件
       // 监听左侧目录点击事件
       document.getElementById('app').addEventListener('click', async function (event) {
        console.log('获取',event)
        // 判断点击的元素是否是链接
        if (event.target.tagName === 'A') {
          // 阻止默认行为，即不跳转到链接
          event.preventDefault();

          // 获取点击的链接的href
          const link = event.target.getAttribute('href');

          // 请求右侧Markdown内容
          const responseContent = await fetch('your-markdown-content-api-endpoint', {
            method: 'POST', // 或其他适当的请求方法
            headers: {
              'Content-Type': 'application/json', // 根据实际情况设置请求头
            },
            body: JSON.stringify({ link }),
          });

          const markdownContent = await responseContent.text();

          // 将Markdown内容插入到Docsify页面
          document.getElementById('main').innerHTML = markdownContent;
        }
        });
        } catch (error) {
        console.error('Error:', error);
        }
    });
}