/**
 * @name InitReportData.js
 * @description 주간업무보고 작성시 기본값을 설정합니다.
 * @version 1.0
 * @since 2023.08.28
 * @dependency none
 */

const CONTAINER_SELECTOR = '.approval-wrap.write';
const CONTENT_SELECTOR = '#new_compose_contents';
const TITLE_SELECTOR = 'input#approval_document_title';
const SELECT_SELECTOR = 'select[name="approval_form_no"]';
const IFRAME_SELECTOR = 'iframe.se-contents-edit';

const INIT_REPORT_DELAY = 1500; // 리포트값 초기화 딜레이
const WEEK_REPORT_VALUE = '851'; // 주간업무보고

const today = new Date();
const thisMondayOffset = today.getDay() == 0 ? -6 : 1 - today.getDay();
const thisMonday = new Date(today);
thisMonday.setDate(today.getDate() + thisMondayOffset);
const lastMonday = new Date(today);
lastMonday.setDate(thisMonday.getDate() - 7);
const lastFriday = new Date(today);
lastFriday.setDate(thisMonday.getDate() - 3);

const TITLE_TEXT = `[주간업무보고] ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`
const PROJECT_HTML = '프로젝트명 : 프로젝트';

const PERIOD_HTML = `기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;간 : ${lastMonday.getFullYear()}년 ${lastMonday.getMonth()+ 1}월 ${lastMonday.getDate()}일
 ~ ${lastFriday.getFullYear()}년 ${lastFriday.getMonth() + 1}월 ${lastFriday.getDate()}일`;

function nextDate(date, added){
	const nDate = new Date(date);
	nDate.setDate(nDate.getDate() + added);
	return nDate;
}

const container = document.querySelector(CONTAINER_SELECTOR);
container.style.width = '1400px';

const contentElement = document.querySelector(CONTENT_SELECTOR);
contentElement.style.height = "800px";

const selectElement = document.querySelector(SELECT_SELECTOR);
selectElement.addEventListener('change', evt => {
	if(evt.target.value == WEEK_REPORT_VALUE){
		setTimeout(initReportData, INIT_REPORT_DELAY);
	}
});


function initReportData(){
	const titleInput = document.querySelector(TITLE_SELECTOR);
	titleInput.value = TITLE_TEXT;
	
	
	const iframe = contentElement.querySelector(IFRAME_SELECTOR);
	const iframeDocument = iframe.contentWindow.document;
	
	const rows = iframeDocument.querySelectorAll('tbody > tr');
	
	const project = rows[1].querySelector('td > p > span');
	project.innerHTML = PROJECT_HTML;
	
	const period = rows[2].querySelector('td > p > span');
	period.innerHTML = PERIOD_HTML
	
	const prevWeekRow = rows[3];
	setCellDateText(prevWeekRow, lastMonday, 0);
	setCellDateText(prevWeekRow, lastMonday, 1);
	setCellDateText(prevWeekRow, lastMonday, 2);
	setCellDateText(prevWeekRow, lastMonday, 3);
	setCellDateText(prevWeekRow, lastMonday, 4);
	
	const thiwWeekRow = rows[7];
	setCellDateText(thiwWeekRow, thisMonday, 0);
	setCellDateText(thiwWeekRow, thisMonday, 1);
	setCellDateText(thiwWeekRow, thisMonday, 2);
	setCellDateText(thiwWeekRow, thisMonday, 3);
	setCellDateText(thiwWeekRow, thisMonday, 4);
}

function setCellDateText(rows, date, offset){
	const dayString = new Map();
	dayString.set(0, "월");
	dayString.set(1, "화");
	dayString.set(2, "수");
	dayString.set(3, "목");
	dayString.set(4, "금");
	
	rows.querySelectorAll('td')[offset + 1].querySelector('p > span')
		.innerHTML = `${nextDate(date, offset).getMonth() + 1}/${nextDate(date, offset).getDate()} ${dayString.get(offset)}`;
}