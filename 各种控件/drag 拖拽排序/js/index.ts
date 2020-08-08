;(function dragItemAndSwitch() {
  // 使用事件委托
  // 委托元素 node
  const node = document.querySelector('#drag-items') as HTMLElement

  interface IPosition {
    x: number
    y: number
  }

  // 鼠标拖动项
  let dragging: any = null
  // 覆盖的目标
  let dragTarget: any = null
  let start: IPosition

  // 拖动开始事件
  node.addEventListener('dragstart', function (e: DragEvent) {
    // 设置一张透明的图片去除默认的预览图
    const img = new Image()
    img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E"
    e.dataTransfer && e.dataTransfer.setDragImage(img, 0, 0)

    dragging = e.target
    start = { x: e.clientX, y: e.clientY }

    const target = e.target as HTMLElement
    target.classList.add('dragging')
  })

  // 拖动到放置目标上时
  node.addEventListener('dragover', function (e: DragEvent) {
    e.preventDefault()
    const target = e.target as HTMLElement

    // 必须是可拖动的元素 && 放置目标必须与之前那次不同
    if (isDragItem(target) && target !== dragTarget) {
      dragTarget = target
    }
  })

  // 拖动过程中
  node.addEventListener('drag', function (e: DragEvent) {
    const target = e.target as HTMLElement
    if (isDragItem(target)) {
      let move = { x: e.clientX - start.x, y: e.clientY - start.y }
      let minX = node.offsetLeft - target.offsetLeft
      let minY = node.offsetTop - target.offsetTop
      let maxX = node.offsetLeft + node.clientWidth - (target.offsetLeft + target.clientWidth)
      let maxY = node.offsetTop + node.clientHeight - (target.offsetTop + target.clientHeight)

      if (move.x < minX) {
        move.x = minX
      }
      if (move.x > maxX) {
        move.x = maxX
      }
      if (move.y < minY) {
        move.y = minY
      }
      if (move.y > maxY) {
        move.y = maxY
      }

      // 限制范围后，最后一次触发事件时动画会产生 bug ，需要过滤这一次的 transform
      if ((move.x === 0 && move.y === 0) || (move.x === minX && move.y === 0) || (move.x === minX && move.y === minY))
        return
      target.style.transform = `translate(${move.x}px, ${move.y}px)`
    }
  })

  // 拖拽动作结束事件
  node.addEventListener('dragend', function (e: DragEvent) {
    const target = e.target as HTMLElement
    target.classList.add('back-anime')
    setTimeout(() => {
      target.classList.remove('back-anime')
      target.style.transform = 'translate(0px, 0px)'
      target.classList.remove('dragging')
    }, 300)
    dragging = null
    dragTarget = null
  })

  // 获取当前拖动的元素在父容器中的 index
  function getIndex(el: HTMLElement) {
    if (!el || !el.parentNode) {
      return -1
    }
    let index = 0
    let children = el.parentNode.children

    for (let i = 0, length = children.length; i < length; i++) {
      let child = children[i] as HTMLElement
      // index 自增条件：必须是可拖动的元素 && 元素必须不是当前拖动的元素
      if (isDragItem(child) && child !== el) {
        index++
      } else {
        return index
      }
    }
    return -1
  }

  // 判断元素是否是可拖拽的元素
  function isDragItem(target: HTMLElement) {
    return target.classList.value.indexOf('drag-item') > -1 ? true : false
  }
})()
