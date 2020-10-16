// 指定 DOM 元素
var list = document.querySelector('.todo-list');
var sendData = document.querySelector('.add-button');
var body = document.body; // 鍵盤輸入動作
// var getData = localStorage.getItem('listData');
// 	var data = JSON.parse(getData);  這兩條合併之後變成  var data =      JSON.parse(localStorage.getItem('listData'))
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽動作
sendData.addEventListener('click', addData);
list.addEventListener('click', toggleDone); // 點擊之後會進行刪除動作
body.addEventListener('keydown', submitBtn);
updateList(data);

// 加入列表
function addData(e) {
	var userInput = document.querySelector('.todo-input').value;
	var todoList = {  //  將填寫的所有內容放入 todoList 內
		content: userInput
	};
	if (userInput == '') {
		alert('請記得輸入內容呦^^')
		return
	} else if (userInput !== '') {
		document.querySelector('.todo-input').value = "";
	}
	data.push(todoList); // 利用 push 方法將 todo 列表更新至 data 陣列中  data 為 [{ content: 輸入的內容 }]
	updateList(data);    // 利用 updateList 函式更新 list
	localStorage.setItem('listData', JSON.stringify(data)); // 把獲得的 data 資訊存在 listData (key) 內，並用 stringify 轉為字串
}

// 鍵盤監聽輸入
function submitBtn(e) {
	if (e.keyCode == 13) {
		addData(e);
	} else {
		return;
	}
}

// 更新列表
function updateList(item) {
	var strList = '';
	for (var i = 0; i < item.length; i++) {
		strList += `<li class="todo-item"> ${item[i].content} <a href="#" data-index=${i} class="data-index"> 刪除 </a></li>`;

	}
	list.innerHTML = strList;
};


// 刪除代辦事項
function toggleDone(e) {
	if (e.target.nodeName !== 'A') { return };
	var index = e.target.dataset.index;
	data.splice(index, 1);
	updateList(data);
	localStorage.setItem('listData', JSON.stringify(data));
}
