function calculateScore() {
    // 입력값 가져오기
    const sleep = parseFloat(document.getElementById('sleep').value);
    const exercise = parseFloat(document.getElementById('exercise').value);
    const water = parseFloat(document.getElementById('water').value);

    // 입력값 검증
    if (isNaN(sleep) || isNaN(exercise) || isNaN(water)) {
        alert('모든 항목을 입력해주세요!');
        return;
    }

    // 각 항목별 점수 계산
    const sleepScore = calculateSleepScore(sleep);
    const exerciseScore = calculateExerciseScore(exercise);
    const waterScore = calculateWaterScore(water);

    // 총점 계산 (100점 만점)
    const totalScore = sleepScore + exerciseScore + waterScore;

    // 결과 표시
    displayResult(totalScore, sleepScore, exerciseScore, waterScore);
}

function calculateSleepScore(hours) {
    // 수면 점수 (35점 만점)
    if (hours >= 7 && hours <= 8) return 35;
    if (hours >= 6 && hours < 7) return 25;
    if (hours > 8 && hours <= 9) return 25;
    return 15;
}

function calculateExerciseScore(minutes) {
    // 운동 점수 (35점 만점)
    if (minutes >= 30 && minutes <= 60) return 35;
    if (minutes > 60 && minutes <= 120) return 30;
    if (minutes > 0 && minutes < 30) return 20;
    return 10;
}

function calculateWaterScore(liters) {
    // 물 섭취 점수 (30점 만점)
    if (liters >= 2 && liters <= 3) return 30;
    if (liters >= 1.5 && liters < 2) return 25;
    if (liters > 3 && liters <= 4) return 25;
    return 15;
}

function displayResult(totalScore, sleepScore, exerciseScore, waterScore) {
    const resultDiv = document.getElementById('result');
    let resultHTML = `
        <h2>당신의 건강 점수: ${totalScore}점</h2>
    `;

    // 전체 평가 메시지
    if (totalScore >= 90) {
        resultHTML += `<p style="color: #2ecc71">최고의 건강 관리! 현재의 습관을 유지하세요.</p>`;
    } else if (totalScore >= 75) {
        resultHTML += `<p style="color: #3498db">좋은 건강 습관을 가지고 계시네요! 조금만 더 노력해보세요.</p>`;
    } else if (totalScore >= 60) {
        resultHTML += `<p style="color: #f1c40f">건강 관리에 더 신경 쓰면 좋겠어요. 아래 조언을 참고하세요.</p>`;
    } else {
        resultHTML += `<p style="color: #e74c3c">건강 관리가 필요합니다. 아래 사항들을 실천해보세요:</p>`;
    }

    // 개선 필요 항목 표시
    let recommendations = [];
    if (sleepScore < 35) {
        recommendations.push("수면: 하루 7-8시간의 수면을 취하도록 하세요. 규칙적인 수면 시간이 중요합니다.");
    }
    if (exerciseScore < 35) {
        recommendations.push("운동: 하루 30-60분의 적절한 운동이 필요합니다. 걷기부터 시작해보세요.");
    }
    if (waterScore < 30) {
        recommendations.push("수분 섭취: 하루 2-3리터의 물을 마시도록 노력하세요. 물병을 항상 가까이 두세요.");
    }

    if (recommendations.length > 0) {
        resultHTML += "<ul>";
        recommendations.forEach(rec => {
            resultHTML += `<li>${rec}</li>`;
        });
        resultHTML += "</ul>";
    }

    resultDiv.innerHTML = resultHTML;
}
