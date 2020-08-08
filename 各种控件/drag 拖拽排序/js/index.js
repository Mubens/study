;
(function dragAction() {
    // 使用事件委托
    // 委托元素 node
    var node = document.querySelector('#drag-items');
    // 鼠标拖动项
    var dragging = null;
    // 覆盖的目标
    var dragTarget = null;
    var start;
    var f = false;
    var last = { x: null, y: null };
    // 拖动开始事件
    node.addEventListener('dragstart', function (e) {
        // 设置一张透明的图片去除默认的预览图
        var img = new Image();
        img.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E";
        e.dataTransfer.setDragImage(img, 0, 0);
        dragging = e.target;
        start = { x: e.clientX, y: e.clientY };
        var target = e.target;
        target.classList.add('dragging');
    });
    // 拖动到放置目标上时
    node.addEventListener('dragover', function (e) {
        e.preventDefault();
        var target = e.target;
        // 节流：必须是可拖动的元素 && 放置目标必须与之前那次不同
        if (isDragItem(target) && target !== dragTarget) {
            dragTarget = target;
        }
    });
    // 拖动过程中
    node.addEventListener('drag', function (e) {
        var target = e.target;
        var move = {
            x: e.clientX - start.x,
            y: e.clientY - start.y
        };
        var minX = -(getIndex(target) % 5) * 112;
        var minY = (getIndex(target) < 5 ? 0 : -1) * 112;
        var maxX = node.clientWidth - ((getIndex(target) % 5) + 1) * 112;
        var maxY = node.clientHeight - Math.floor(getIndex(target) / 5 + 1) * 112;
        if (move.x < minX) {
            move.x = minX;
        }
        if (move.x > maxX) {
            move.x = maxX;
        }
        if (move.y < minY) {
            move.y = minY;
        }
        if (move.y > maxY) {
            move.y = maxY;
        }
        // 限制范围后，最后一次触发会产生 bug
        if (move.x > 0 || move.y > 0) {
            target.style.transform = "translate(" + move.x + "px, " + move.y + "px)";
            return;
        }
        if (move.x < 0 &&
            move.x !== -(getIndex(target) % 5) * 112 &&
            move.y === 0) {
            target.style.transform = "translate(" + move.x + "px, " + move.y + "px)";
            return;
        }
        if (move.x <= 0 && move.y < 0 && move.y !== -112) {
            target.style.transform = "translate(" + move.x + "px, " + move.y + "px)";
            return;
        }
    });
    // 拖拽动作结束事件
    node.addEventListener('dragend', function (e) {
        var target = e.target;
        target.classList.add('back-anime');
        setTimeout(function () {
            target.classList.remove('back-anime');
            target.style.transform = 'translate(0px, 0px)';
            target.classList.remove('dragging');
        }, 300);
        dragging = null;
        dragTarget = null;
    });
    // 获取当前拖动的元素在父容器中的 index
    function getIndex(el) {
        if (!el || !el.parentNode) {
            return -1;
        }
        var index = 0;
        var children = el.parentNode.children;
        for (var i = 0, length_1 = children.length; i < length_1; i++) {
            var child = children[i];
            // index 自增条件：必须是可拖动的元素 && 元素必须不是当前拖动的元素
            if (isDragItem(child) && child !== el) {
                index++;
            }
            else {
                return index;
            }
        }
        return -1;
    }
    // 判断元素是否是可拖拽的元素
    function isDragItem(target) {
        return target.classList.value.indexOf('drag-item') > -1 ? true : false;
    }
    var a;
    // 限制坐标移动范围
    function rangePosition(el, pos) {
        var index = getIndex(el);
        var x = pos.x;
        var y = pos.y;
        var minX = -el.clientWidth * index;
        var minY = -el.clientHeight * (index < 5 ? 0 : 1);
        var maxX = node.clientWidth - el.clientWidth * ((index % 5) + 1);
        var maxY = node.clientHeight - el.clientHeight * (index < 5 ? 1 : 2);
        if (x < minX)
            x = minX;
        if (x > maxX)
            x = maxX;
        if (y < minY)
            y = minY;
        if (y > maxY)
            y = maxY;
        console.log({ x: x, y: y, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
        return { x: x, y: y };
    }
    function getTransformPositon(str) {
        var reg = /(\d+).*?(\d+)/s;
        var res = reg.exec(str || '0,0');
        return {
            x: res[1],
            y: res[2]
        };
    }
})();
