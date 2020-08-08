;(function dragAction() {
  // 使用事件委托
  // 委托元素 node
  const node = document.querySelector('#drag-items') as HTMLElement

  interface IPosition {
    x: number
    y: number
  }

  // 鼠标拖动项
  let dragging = null
  // 覆盖的目标
  let dragTarget = null
  let start: IPosition
  let f = false
  let last: IPosition = { x: null, y: null }

  // 拖动开始事件
  node.addEventListener('dragstart', function (e: DragEvent) {
    // 设置一张透明的图片去除默认的预览图
    const img = new Image()
    img.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E"
    e.dataTransfer.setDragImage(img, 0, 0)

    dragging = e.target
    start = { x: e.clientX, y: e.clientY }

    const target = e.target as HTMLElement
    target.classList.add('dragging')
  })

  // 拖动到放置目标上时
  node.addEventListener('dragover', function (e: DragEvent) {
    e.preventDefault()
    const target = e.target as HTMLElement

    // 节流：必须是可拖动的元素 && 放置目标必须与之前那次不同
    if (isDragItem(target) && target !== dragTarget) {
      dragTarget = target
    }
  })

  // 拖动过程中
  node.addEventListener('drag', function (e: DragEvent) {
    let target = e.target as HTMLElement
    let move = {
      x: e.clientX - start.x,
      y: e.clientY - start.y
    }
    let minX = -(getIndex(target) % 5) * 112
    let minY = (getIndex(target) < 5 ? 0 : -1) * 112
    let maxX = node.clientWidth - ((getIndex(target) % 5) + 1) * 112
    let maxY = node.clientHeight - Math.floor(getIndex(target) / 5 + 1) * 112

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

    // 限制范围后，最后一次触发会产生 bug
    if (move.x > 0 || move.y > 0) {
      target.style.transform = `translate(${move.x}px, ${move.y}px)`
      return
    }

    if (
      move.x < 0 &&
      move.x !== -(getIndex(target) % 5) * 112 &&
      move.y === 0
    ) {
      target.style.transform = `translate(${move.x}px, ${move.y}px)`
      return
    }

    if (move.x <= 0 && move.y < 0 && move.y !== -112) {
      target.style.transform = `translate(${move.x}px, ${move.y}px)`
      return
    }
  })

  // 拖拽动作结束事件
  node.addEventListener('dragend', function (e: DragEvent) {
    let target = e.target as HTMLElement
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

  let a: IPosition
  // 限制坐标移动范围
  function rangePosition(el: HTMLElement, pos: IPosition): IPosition {
    const index = getIndex(el)
    let x = pos.x
    let y = pos.y
    const minX = -el.clientWidth * index
    const minY = -el.clientHeight * (index < 5 ? 0 : 1)
    const maxX = node.clientWidth - el.clientWidth * ((index % 5) + 1)
    const maxY = node.clientHeight - el.clientHeight * (index < 5 ? 1 : 2)

    if (x < minX) x = minX
    if (x > maxX) x = maxX
    if (y < minY) y = minY
    if (y > maxY) y = maxY
    console.log({ x, y, minX, minY, maxX, maxY })
    return { x, y }
  }

  function getTransformPositon(str: string) {
    const reg = /(\d+).*?(\d+)/s
    const res = reg.exec(str || '0,0')
    return {
      x: res[1],
      y: res[2]
    }
  }
})()
