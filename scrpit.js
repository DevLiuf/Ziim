function calculateResults() {
  // ... 계산 로직 ...
  const form = document.getElementById('timeOrientationForm');
  let scores = { futureOriented: [], presentHedonistic: [], presentFatalistic: [], pastPositive: [], pastNegative: [] };
  let adjustedScores = {};

  for (let i = 1; i <= 56; i++) {
    let score = parseInt(form['question' + i].value, 10);
    if ([9, 24, 25, 41, 56].includes(i)) { // 역 채점 문항
      score = 6 - score;
    }

    // 각 카테고리에 점수 추가
    if ([6, 9, 10, 13, 18, 21, 24, 30, 40, 43, 45, 51, 56].includes(i)) scores.futureOriented.push(score);
    if ([1, 8, 12, 17, 19, 23, 26, 28, 31, 32, 42, 44, 46, 48, 55].includes(i)) scores.presentHedonistic.push(score);
    if ([3, 14, 35, 37, 38, 39, 47, 52, 53].includes(i)) scores.presentFatalistic.push(score);
    if ([2, 7, 11, 15, 20, 25, 29, 41, 49].includes(i)) scores.pastPositive.push(score);
    if ([4, 5, 16, 22, 27, 33, 34, 36, 50, 54].includes(i)) scores.pastNegative.push(score);
  }

  // 평균 점수 계산
  for (let category in scores) {
    scores[category] = average(scores[category]);
  }

  // 조정 점수 계산
  adjustedScores.futureOriented = (scores.futureOriented - 3.47) / 0.54;
  adjustedScores.presentHedonistic = (scores.presentHedonistic - 3.44) / 0.51;
  adjustedScores.presentFatalistic = (scores.presentFatalistic - 2.37) / 0.6;
  adjustedScores.pastPositive = (scores.pastPositive - 3.71) / 0.64;
  adjustedScores.pastNegative = (scores.pastNegative - 2.98) / 0.72;

  // 결과 표시
  document.getElementById('results').innerHTML = `
        <h2>결과</h2>
        미래 지향적 시간관: ${adjustedScores.futureOriented.toFixed(2)}<br>
        현재 쾌락적 시간관: ${adjustedScores.presentHedonistic.toFixed(2)}<br>
        현재 숙명론적 시간관: ${adjustedScores.presentFatalistic.toFixed(2)}<br>
        과거 긍정적 시간관: ${adjustedScores.pastPositive.toFixed(2)}<br>
        과거 부정적 시간관: ${adjustedScores.pastNegative.toFixed(2)}
    `;
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function createQuestionsHTML() {
  const questions = [
    // 여기에 모든 문항들을 추가합니다
    "친구들과 어울려 파티를 즐기는 일은 삶의 중요한 즐거움 중 하나다.",
    "어린 시절에 경험한 것과 비슷한 광경, 소리, 냄새를 만나면 추억이 물밀듯 밀려온다.",
    "내 삶의 상당 부분을 좌우하는 것은 운명이다.",
    "과거에 한 행동을 후회하는 일이 잦다.",
    "결정을 내릴 때 주변 사람과 환경의 영향을 많이 받는다.",
    "매일 아침 반드시 그날의 계획을 세워 두어야 한다.",
    "과거를 돌아보는 일은 즐겁다.",
    "충동적으로 행동한다.",
    "일이 제시간에 마무리되지 않아도 크게 걱정하지 않는다.",
    "무언가를 성취하고자 하면, 목표를 세우고 그 목표를 달성할 방법을 꼼꼼히 검토한다.",
    "전체적으로 볼 때 나의 과거에는 나쁜 일보다 좋은 일이 더 많았다.",
    "좋아하는 음악을 듣다 보면 시간을 잊는 경우가 종종 있다.",
    "내일이 마감인 일을 모두 마치지 않으면 오늘 밤 외출은 불가능하다.",
    "일어날 일은 일어나게 되어있으므로 내가 무엇을 하건 크게 상관없다.",
    "좋았던 옛 시절 얘기를 좋아한다.",
    "고통스러운 과거의 기억이 자꾸 떠오른다.",
    "나는 하루하루를 최대한 충실히 살려고 노력한다.",
    "약속 시간에 늦으면 언짢다.",
    "매일을 생애 마지막 날인 것처럼 사는 게 이상적이다.",
    "좋았던 시절의 행복한 추억들이 쉽사리 떠오른다.",
    "사적인 것이든 공적인 것이든 약속과 의무는 꼭 지킨다.",
    "나는 과거에 학대와 거부를 당할 만큼 당했다.",
    "나는 충동적으로 결정을 내린다.",
    "미리 계획을 세우기보다 그 날 그 날 일어나는 일에 대처한다.",
    "불쾌한 기억이 너무 많아 과거의 일에 대해서는 잘 생각하지 않는다.",
    "삶에는 자극이 필요하다.",
    "과거에 한 실수 중에 지워버리고 싶은 것들이 있다.",
    "일을 제시간에 처리하는 것보다 하고 있는 일을 즐기는 것이 더 중요하다고 생각한다.",
    "어린 시절에 대한 향수가 있다.",
    "결정을 내리기 전에 이익과 손실을 따져본다.",
    "가끔 위험을 감수하면 삶이 권태롭지 않다.",
    "목적지에 도달하려는 노력보다 인생의 여정을 즐기는 일이 내게는 더 중요하다.",
    "내가 기대한 대로 되는 일이 거의 없다.",
    "어린 시절의 불쾌한 기억들이 잘 잊히지 않는다.",
    "목표와 결과, 생산량을 생각하면 일하는 과정에서 즐거움을 느끼거나 몰입하기 힘들어진다.",
    "현재의 순간을 즐기면서도 과거에 한 비슷한 경험과 자꾸 비교하게 된다.",
    "모든 것은 끊임없이 변하므로 미래에 대한 계획을 세우는 일은 사실상 불가능하다.",
    "삶의 여정은 내가 좌지우지할 수 없는 어떤 힘의 지배를 받는다.",
    "미래에 대한 걱정은 부질없다. 내가 할 수 있는 일이 아무것도 없기 때문이다.",
    "나는 일을 착실하게 진행해나가 제 시간에 마친다.",
    "가족들이 옛 시절에 관해 이야기하면 나는 관심을 꺼버린다.",
    "생활에 자극을 주기 위해 위험을 감수한다.",
    "해야 할 일의 목록을 작성한다.",
    "머리보다 마음을 따를 때가 많다.",
    "해야 할 일이 있으면 유혹을 물리지고 일에 전념할 수 있다.",
    "순간의 흥분에 휩쓸리는 경향이 있다.",
    "현대인의 삶은 너무 복잡하다. 과거의 단순한 삶으로 돌아가고 싶다.",
    "늘 한결같은 친구보다는 어디로 불지 알 수 없는 친구가 더 좋다.",
    "정기적으로 행해지는 가족 예식이나 전통이 좋다.",
    "과거에 일어난 좋지 않은 일들을 생각한다.",
    "발전을 위해서라면 힘들고 따분한 일도 계속 한다.",
    "벌어들인 돈은 미래를 위해 저축하기보다 오늘의 즐거움을 위해 쓰는 편이 낫다.",
    "노력보다 운이 더 좋은 결과를 낳을 때가 있다.",
    "살아오면서 놓친 좋은 것들에 대해 생각한다.",
    "가까운 사람들과는 열정적인 관계를 유지하고 싶다.",
    "미뤄둔 일을 할 시간은 얼마든지 있을 것이다.",
  ];

  let html = questions.map((question, index) => `
  <div>
  <fieldset>
    <legend>${index + 1}. ${question}</legend>
    <label>
      <input type="radio" name="question${index + 1}" value="1"> 1점
      </label>
      <label>
      <input type="radio" name="question${index + 1}" value="2"> 2점
      </label>
      <label>
      <input type="radio" name="question${index + 1}" value="3"> 3점
      </label>
      <label>
      <input type="radio" name="question${index + 1}" value="4"> 4점
      </label>
      <label>
      <input type="radio" name="question${index + 1}" value="5"> 5점
    </label>
  </fieldset>
</div>
    `).join('');

  html += '<br><input type="button" value="결과 보기" onclick="calculateResults()">';  // 결과 보기 버튼 추가
  document.getElementById('timeOrientationForm').innerHTML = html;
}
window.onload = createQuestionsHTML; // 페이지 로드 시 함수 실행

