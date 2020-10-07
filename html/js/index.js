$(function () {
    // 展示数据
    axios.get("http://localhost:3000/products").then(res => {
        // console.log(res.data);
        let str = "";
        res.data.forEach(item => {
            str += `
            <tr data-id="${item.id}">
                <td><img src="${item.img}" alt=""></td>
                <td>${item.title}</td>
                <td>${item.produce}</td>
                <td>￥${item.price}</td>
                <td><a data-id="${item.id}" class="delete">删除</a></td>
            </tr>
            `;
            $("tbody").html(str);
        });
        // 删除数据
        $("tbody>tr>td:last-child a").click(function (e) {
            // 阻止冒泡
            var evt = e || event;
            evt.stopPropagation();
            // 删除json中的数据
            var id = e.currentTarget.getAttribute("data-id");
            axios.delete("http://localhost:3000/products/" + id);
            // 删除页面中的结构
            $(this).parent().parent().detach();
        })
    })
    // 添加数据
    let add_product = $(".add-product");
    let pro_url = $(".pro-url");
    let pro_name = $("#pro-name");
    let pro_produce = $("#pro-produce");
    let pro_price = $("#pro-price");
    add_product.click(function () {
        axios.post("http://localhost:3000/products", {
            title: pro_name.val(),
            produce: pro_produce.val(),
            img: pro_url.val(),
            price: pro_price.val()
        }).then(() => {
            location.reload();
        })
    })
    // 点击tr进入详情页
    $("tbody").click(function (e) {
        var id = e.target.parentNode.getAttribute("data-id");
        console.log(id);
        document.cookie = "productID=" + id;
        location.href = "detail.html";
    })
})