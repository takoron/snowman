document.addEventListener('DOMContentLoaded', () => {
  // Compatibility form submit event
  const compatibilityForm = document.getElementById('compatibility-form');
  if (compatibilityForm) {
    compatibilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const userName = document.getElementById('user-name').value || 'あなた';
      const birthDate = document.getElementById('birth-date').value;
      const bloodType = document.querySelector('input[name="blood-type"]:checked')?.value || 'unknown';
      
      // Get selected personality traits
      const personalityTraits = [];
      document.querySelectorAll('input[name="personality"]:checked').forEach(checkbox => {
        personalityTraits.push(checkbox.value);
      });
      
      const favoriteColor = document.getElementById('favorite-color').value;
      const currentOshi = document.getElementById('current-oshi').value;
      
      // Generate compatibility results
      generateCompatibilityResult(userName, birthDate, bloodType, personalityTraits, favoriteColor, currentOshi);
    });
  }
  
  // Share buttons click events
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
    button.addEventListener('click', () => {
      alert('SNSシェア機能は現在準備中です。もうしばらくお待ちください。');
    });
  });
});

// Generate compatibility result based on user input
function generateCompatibilityResult(userName, birthDate, bloodType, personalityTraits, favoriteColor, currentOshi) {
  const resultElement = document.getElementById('compatibility-result');
  if (!resultElement) return;
  
  // Parse birth date
  const birthDateObj = new Date(birthDate);
  const birthMonth = birthDateObj.getMonth() + 1; // 0-indexed to 1-indexed
  const birthDay = birthDateObj.getDate();
  
  // Define members data
  const members = [
    {
      id: 'iwamoto',
      name: '岩本 照',
      compatibilityFactors: {
        months: [1, 2, 3, 12],
        bloodTypes: ['A', 'O'],
        personalities: ['calm', 'kind', 'serious'],
        colors: ['blue', 'white', 'black']
      }
    },
    {
      id: 'fukazawa',
      name: '深澤 辰哉',
      compatibilityFactors: {
        months: [4, 5, 6],
        bloodTypes: ['B', 'AB'],
        personalities: ['calm', 'funny', 'kind'],
        colors: ['green', 'white', 'blue']
      }
    },
    {
      id: 'sakuma',
      name: '佐久間 大介',
      compatibilityFactors: {
        months: [6, 7, 8],
        bloodTypes: ['A', 'AB'],
        personalities: ['cheerful', 'funny', 'passionate'],
        colors: ['orange', 'red', 'yellow']
      }
    },
    {
      id: 'watanabe',
      name: '渡辺 翔太',
      compatibilityFactors: {
        months: [10, 11, 12],
        bloodTypes: ['A', 'B'],
        personalities: ['passionate', 'serious', 'logical'],
        colors: ['purple', 'black', 'white']
      }
    },
    {
      id: 'raul',
      name: 'ラウール',
      compatibilityFactors: {
        months: [5, 6, 7],
        bloodTypes: ['O', 'B'],
        personalities: ['cheerful', 'passionate', 'kind'],
        colors: ['yellow', 'orange', 'red']
      }
    },
    {
      id: 'mukai',
      name: '向井 康二',
      compatibilityFactors: {
        months: [5, 6, 7],
        bloodTypes: ['AB', 'B'],
        personalities: ['cheerful', 'funny', 'passionate'],
        colors: ['red', 'orange', 'yellow']
      }
    },
    {
      id: 'abe',
      name: '阿部 亮平',
      compatibilityFactors: {
        months: [7, 8, 9],
        bloodTypes: ['A', 'AB'],
        personalities: ['kind', 'serious', 'logical'],
        colors: ['blue', 'green', 'white']
      }
    },
    {
      id: 'miyadate',
      name: '宮舘 涼太',
      compatibilityFactors: {
        months: [2, 3, 4],
        bloodTypes: ['O', 'A'],
        personalities: ['calm', 'logical', 'serious'],
        colors: ['blue', 'white', 'black']
      }
    },
    {
      id: 'meguro',
      name: '目黒 蓮',
      compatibilityFactors: {
        months: [1, 2, 3],
        bloodTypes: ['O', 'B'],
        personalities: ['calm', 'serious', 'logical'],
        colors: ['black', 'white', 'purple']
      }
    }
  ];
  
  // Calculate compatibility scores
  const memberScores = members.map(member => {
    let score = 0;
    
    // Month compatibility (0-4 points)
    if (member.compatibilityFactors.months.includes(birthMonth)) {
      score += 4;
    }
    
    // Blood type compatibility (0-3 points)
    if (member.compatibilityFactors.bloodTypes.includes(bloodType)) {
      score += 3;
    }
    
    // Personality compatibility (0-5 points)
    const personalityMatchCount = personalityTraits.filter(trait => 
      member.compatibilityFactors.personalities.includes(trait)
    ).length;
    score += Math.min(personalityMatchCount, 5);
    
    // Color compatibility (0-3 points)
    if (favoriteColor && member.compatibilityFactors.colors.includes(favoriteColor)) {
      score += 3;
    }
    
    // Current oshi bonus (5 points)
    if (currentOshi === member.id) {
      score += 5;
    }
    
    // Birthday bonus (0-5 points)
    // Special case: if birth month and day are close to member's, add bonus
    const memberBirthMonthDay = getMemberBirthMonthDay(member.id);
    if (memberBirthMonthDay) {
      const [memberMonth, memberDay] = memberBirthMonthDay;
      
      if (memberMonth === birthMonth) {
        // Same month, check day difference
        const dayDiff = Math.abs(memberDay - birthDay);
        if (dayDiff <= 3) {
          score += 5; // Very close birthday
        } else if (dayDiff <= 7) {
          score += 3; // Close birthday
        } else {
          score += 1; // Same month at least
        }
      }
    }
    
    return {
      member,
      score,
      // Calculate percentage for display (max score is 20)
      percentage: Math.min(Math.round(score / 20 * 100), 100)
    };
  });
  
  // Sort by score (highest first)
  memberScores.sort((a, b) => b.score - a.score);
  
  // Get top 3
  const topThreeMembers = memberScores.slice(0, 3);
  
  // Get compatibility with current oshi if specified
  let oshiCompatibility = null;
  if (currentOshi && currentOshi !== 'none') {
    oshiCompatibility = memberScores.find(item => item.member.id === currentOshi);
  }
  
  // Generate result HTML
  displayCompatibilityResults(userName, topThreeMembers, oshiCompatibility);
}

// Display compatibility results
function displayCompatibilityResults(userName, topThreeMembers, oshiCompatibility) {
  const resultElement = document.getElementById('compatibility-result');
  if (!resultElement) return;
  
  // Create HTML for top three members
  let topThreeHTML = '';
  topThreeMembers.forEach((item, index) => {
    const rankLabel = index === 0 ? '1位' : index === 1 ? '2位' : '3位';
    
    // Create percentage bar
    const percentageBar = `
      <div class="percentage-bar-container">
        <div class="percentage-bar" style="width: ${item.percentage}%"></div>
        <span class="percentage-value">${item.percentage}%</span>
      </div>
    `;
    
    topThreeHTML += `
      <div class="compatibility-result-item">
        <div class="compatibility-rank">${rankLabel}</div>
        <div class="compatibility-member">
          <h4>${item.member.name}</h4>
          <div class="compatibility-score">
            <span>相性度:</span>
            ${percentageBar}
          </div>
          <p class="compatibility-comment">${getCompatibilityComment(item.percentage)}</p>
        </div>
      </div>
    `;
  });
  
  // Create oshi compatibility HTML if available
  let oshiHTML = '';
  if (oshiCompatibility) {
    // Don't show oshi section if it's already in top 3
    if (topThreeMembers.findIndex(item => item.member.id === oshiCompatibility.member.id) === -1) {
      const percentageBar = `
        <div class="percentage-bar-container">
          <div class="percentage-bar" style="width: ${oshiCompatibility.percentage}%"></div>
          <span class="percentage-value">${oshiCompatibility.percentage}%</span>
        </div>
      `;
      
      oshiHTML = `
        <div class="oshi-compatibility">
          <h4>あなたの推しとの相性</h4>
          <div class="compatibility-result-item">
            <div class="compatibility-member">
              <h4>${oshiCompatibility.member.name}</h4>
              <div class="compatibility-score">
                <span>相性度:</span>
                ${percentageBar}
              </div>
              <p class="compatibility-comment">${getCompatibilityComment(oshiCompatibility.percentage)}</p>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Complete result HTML
  resultElement.innerHTML = `
    <div class="compatibility-result-content">
      <h3>${userName}とSnow Manメンバーとの相性</h3>
      <p class="result-intro">あなたの誕生日や性格から、最も相性の良いメンバーを診断しました!</p>
      
      <div class="compatibility-top-three">
        <h4>相性ベスト3</h4>
        ${topThreeHTML}
      </div>
      
      ${oshiHTML}
      
      <div class="compatibility-advice">
        <h4>相性アドバイス</h4>
        <p>${getCompatibilityAdvice(topThreeMembers[0].member.id)}</p>
      </div>
      
      <button class="retry-btn">もう一度診断する</button>
    </div>
  `;
  
  // Add retry button event
  const retryBtn = resultElement.querySelector('.retry-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      // Scroll to form and reset it
      const form = document.getElementById('compatibility-form');
      form.reset();
      form.scrollIntoView({ behavior: 'smooth' });
      // Hide result
      resultElement.innerHTML = '';
    });
  }
  
  // Scroll to result
  resultElement.scrollIntoView({ behavior: 'smooth' });
}

// Helper function to get member birth month and day
function getMemberBirthMonthDay(memberId) {
  // Member birthdays (month, day)
  const birthdays = {
    'iwamoto': [2, 17],
    'fukazawa': [5, 5],
    'sakuma': [7, 5],
    'watanabe': [11, 5],
    'raul': [6, 27],
    'mukai': [6, 21],
    'abe': [7, 27],
    'miyadate': [3, 25],
    'meguro': [2, 16]
  };
  
  return birthdays[memberId] || null;
}

// Helper function to get compatibility comment based on percentage
function getCompatibilityComment(percentage) {
  if (percentage >= 90) {
    return '素晴らしい相性！運命的な繋がりを感じます。';
  } else if (percentage >= 75) {
    return '非常に良い相性です。お互いを高め合える関係になれそうです。';
  } else if (percentage >= 60) {
    return '良い相性です。共通点がたくさんありそうです。';
  } else if (percentage >= 45) {
    return 'まずまずの相性です。互いの違いを尊重できると良い関係になれます。';
  } else {
    return '少し相性に課題があるかも。でも、違いがあるからこそ新しい発見があるでしょう。';
  }
}

// Helper function to get compatibility advice based on top member
function getCompatibilityAdvice(memberId) {
  const advice = {
    'iwamoto': '真面目で努力家な岩本さんとの相性が良いあなたは、誠実さと謙虚さを大切にする人かもしれません。コンサートでは、特に彼のソロパフォーマンスに注目してみると、さらに魅力を感じられるでしょう。',
    'fukazawa': '天然で優しい深澤さんとの相性が良いあなたは、人のペースを尊重できる寛容さを持っているようです。彼のマイペースな一面に共感できるポイントがあるかもしれません。',
    'sakuma': '明るく情熱的な佐久間さんとの相性が良いあなたは、ポジティブなエネルギーを持っているようです。コンサートでの彼の笑顔に特に元気をもらえるでしょう。',
    'watanabe': 'プライド高めながらも優しい渡辺さんとの相性が良いあなたは、相手の本質を見抜く目を持っているかもしれません。彼の歌声に特別な親しみを感じるでしょう。',
    'raul': '素直でポジティブなラウールさんとの相性が良いあなたは、新しいことへの好奇心が強いタイプかもしれません。年齢に関係なく、純粋な気持ちを大切にできる人でしょう。',
    'mukai': 'ムードメーカーで明るい向井さんとの相性が良いあなたは、人を楽しませることが得意なタイプかもしれません。彼のパフォーマンスから特に活力をもらえるでしょう。',
    'abe': '真面目で優しい阿部さんとの相性が良いあなたは、細やかな気配りができる人かもしれません。彼の知的な一面に特に魅力を感じるでしょう。',
    'miyadate': 'クールながらも繊細な宮舘さんとの相性が良いあなたは、相手の内面を大切にする人かもしれません。彼の表情の変化を楽しめるタイプでしょう。',
    'meguro': '真面目で努力家な目黒さんとの相性が良いあなたは、継続的に何かに取り組むことが得意なタイプかもしれません。彼の成長する姿に特に共感できるでしょう。'
  };
  
  return advice[memberId] || 'あなたと相性の良いメンバーのパフォーマンスに特に注目してみると、新たな魅力を発見できるかもしれません。';
}