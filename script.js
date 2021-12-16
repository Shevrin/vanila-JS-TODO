
const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoComplete = document.querySelector('.todo-completed')

let todoData = []

if (localStorage.getItem('todo')) {
	todoData = JSON.parse(localStorage.getItem('todo'))
	render()
}

function render() {
	todoList.innerHTML = ''
	todoComplete.innerHTML = ''

	todoData.map((item, index) => {
		const li = document.createElement('li')
		li.classList.add('todo-item')
		li.innerHTML =
			`<span class="text-todo">${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
			`
		if (item.completed) {
			todoComplete.append(li)
		} else {
			todoList.append(li)
		}

		li.querySelector('.todo-remove').addEventListener('click', () => {
			let removeTodo = index
			todoData = todoData.filter((_, index) => index !== removeTodo)
			render()
		})
		li.querySelector('.todo-complete').addEventListener('click', () => {
			item.completed = !item.completed
			render()
		})
	})

	localStorage.setItem('todo', JSON.stringify(todoData))
}


todoControl.addEventListener('submit', function (e) {
	e.preventDefault()
	console.log('push');
	if (headerInput.value.trim() !== '') {
		const newTodo = {
			text: headerInput.value,
			completed: false
		}
		todoData.push(newTodo)
		headerInput.value = ''
		render()
	}
})

