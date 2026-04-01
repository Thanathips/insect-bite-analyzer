let base64Image = "";

// ===== ข้อความหลายภาษา =====
const texts = {
  th: {
    uploadFirst: "กรุณาอัปโหลดรูปก่อน",
    analyzing: "กำลังวิเคราะห์...",
    resultLabel: "ผลลัพธ์:",
    suggestedTreatment: "วิธีรักษาที่แนะนำ:",
    noResults: "ไม่พบผลลัพธ์"
  },
  en: {
    uploadFirst: "Please upload an image first",
    analyzing: "Analyzing...",
    resultLabel: "Result:",
    suggestedTreatment: "Suggested Treatment:",
    noResults: "No results found"
  }
};

// ===== ตารางวิธีรักษา ภาษาไทย/อังกฤษ =====
const treatments = {
  mosquito: {
    text: {
      th: "🦟 ยุงกัด<br>- ล้างผิวด้วยน้ำและสบู่อ่อน<br>- ประคบเย็นเพื่อลดคันและบวม<br>- ทาคาลาไมน์หรือครีมสเตียรอยด์อ่อน<br>- หากคันมาก ใช้ยาแก้แพ้",
      en: "🦟 Mosquito Bite<br>- Wash skin with water and mild soap<br>- Apply cold compress to reduce itch and swelling<br>- Apply calamine or mild steroid cream<br>- If very itchy, take antihistamine"
    },
    level: "mild"
  },
  spider: {
    text: {
      th: "🕷 แมงมุมกัด<br>- ทำความสะอาดบาดแผลด้วยสบู่หรือน้ำเกลือ<br>- ประคบเย็นบริเวณที่ถูกกัด<br>- หากมีอาการรุนแรง ไปโรงพยาบาลทันที",
      en: "🕷 Spider Bite<br>- Clean wound with soap or saline<br>- Apply cold compress<br>- If severe, seek medical attention immediately"
    },
    level: "danger"
  },
  bedbug: {
    text: {
      th: "🛏️ ตัวเรือดกัด<br>- ล้างบริเวณที่โดนด้วยน้ำและสบู่อ่อน<br>- ประคบเย็นเพื่อลดคันและบวม<br>- ทาคาลาไมน์หรือครีมสเตียรอยด์อ่อน<br>- หลีกเลี่ยงการเกา<br>🛡️ การป้องกัน: ซักผ้าปูที่นอนด้วยน้ำร้อน, ทำความสะอาดที่นอนและห้องนอนสม่ำเสมอ",
      en: "🛏️ Bedbug Bite<br>- Wash the area with water and mild soap<br>- Apply cold compress to reduce itch and swelling<br>- Apply calamine or mild steroid cream<br>- Avoid scratching<br>🛡️ Prevention: Wash bedding in hot water, clean mattress and room regularly"
    },
    level: "mild"
  },
  fire_ants: {
    text: {
      th: "🔥 มดไฟกัด<br>- ล้างแผลด้วยน้ำสะอาดและสบู่อ่อน<br>- ประคบเย็นเพื่อลดบวมและปวดแสบ<br>- ทาคาลาไมน์หรือครีมสเตียรอยด์อ่อน<br>- หากคันมาก ใช้ยาแก้แพ้<br>- หลีกเลี่ยงการเกาหรือบีบตุ่มหนอง",
      en: "🔥 Fire Ant Bite<br>- Wash wound with clean water and mild soap<br>- Apply cold compress to reduce swelling and pain<br>- Apply calamine or mild steroid cream<br>- If very itchy, take antihistamine<br>- Avoid scratching or popping blisters"
    },
    level: "mild"
  },
  midges: {
    text: {
      th: "🐜 ไรบิน/มิดจ์กัด<br>- ล้างผิวด้วยน้ำและสบู่อ่อน<br>- ประคบเย็นเพื่อลดคันและบวม<br>- ทาคาลาไมน์หรือครีมสเตียรอยด์อ่อน<br>- หากคันมาก ใช้ยาแก้แพ้",
      en: "🐜 Midges Bite<br>- Wash skin with water and mild soap<br>- Apply cold compress to reduce itch and swelling<br>- Apply calamine or mild steroid cream<br>- If very itchy, take antihistamine"
    },
    level: "mild"
  },
  mites: {
    text: {
      th: "🕷️ ไรกัด<br>- ล้างผิวด้วยน้ำและสบู่อ่อน<br>- ประคบเย็นเพื่อลดคันและอักเสบ<br>- ทาคาลาไมน์หรือครีมสเตียรอยด์อ่อน<br>- หากคันมาก ใช้ยาแก้แพ้",
      en: "🕷️ Mites Bite<br>- Wash skin with water and mild soap<br>- Apply cold compress to reduce itch and inflammation<br>- Apply calamine or mild steroid cream<br>- If very itchy, take antihistamine"
    },
    level: "mild"
  },
  rove_beetle: {
    text: {
      th: "🦂 แมลงก้นกระดกต่อย<br>- รีบล้างด้วยสบู่และน้ำสะอาด หรือใช้น้ำเกลือสำหรับล้างแผลทันที<br>- หากเกิดตุ่มน้ำและรอยแดง สามารถทายาเพื่อรักษารอยแดง ซึ่งจะหายไปเองประมาณ 2-3 วัน<br>- หากมีอาการรุนแรงจากการแพ้พิษ ให้รีบพบแพทย์ แพทย์จะใช้สเตียรอยด์ในการรักษา ส่วนรอยดำจะค่อยๆ จางและหายไปเอง ไม่เป็นแผลเป็น",
      en: "🦂 Rove Beetle Sting<br>- Immediately wash with soap and clean water, or use saline for the wound<br>- If blisters or redness appear, apply appropriate ointment; redness usually heals in 2-3 days<br>- If severe allergic reaction occurs, seek medical attention; doctors may use steroid treatment. Dark spots will fade over time without scarring."
    },
    level: "danger"
  },
  tick_flea: {
    text: {
      th: "🐞 เห็บ/หมัดกัด<br>- คีบหัวเห็บออกอย่างระมัดระวัง<br>- หากบวมแดงรุนแรง ให้พบแพทย์<br>- อาการโดยทั่วไปไม่รุนแรง",
      en: "🐞 Tick/Flea Bite<br>- Carefully remove the tick<br>- See a doctor if redness or swelling is severe<br>- Usually symptoms are mild"
    },
    level: "danger"
  },
  bee_wasp: {
    text: {
      th: "🐝 ผึ้ง/แตนต่อย<br>- ใช้เทปกาวดึงเหล็กในออก<br>- ล้างแผลด้วยสบู่และน้ำ<br>- ประคบน้ำแข็งเพื่อลดบวม<br>- รับประทานยาแก้ปวดและยาแก้แพ้ถ้าจำเป็น<br>- หากแพ้รุนแรง เช่น หายใจลำบาก โทร 1669",
      en: "🐝 Bee/Wasp Sting<br>- Remove stinger using tape<br>- Wash wound with soap and water<br>- Apply ice to reduce swelling<br>- Take painkillers or antihistamines if necessary<br>- Seek urgent help (call 1669) if allergic or breathing difficulty"
    },
    level: "danger"
  }
};

// ===== Normalize ชื่อแมลง/สัตว์กัดต่อย =====
function normalizeInsect(name) {
  name = name.toLowerCase();
  if (name.includes("mosquito") || name.includes("mostiquito") || name.includes("mosq")) return "mosquito";
  if (name.includes("fire ant")) return "fire_ants";
  if (name.includes("spider")) return "spider";
  if (name.includes("bedbug")) return "bedbug";
  if (name.includes("midge")) return "midges";
  if (name.includes("mite")) return "mites";
  if (name.includes("rove beetle")) return "rove_beetle";
  if (name.includes("tick") || name.includes("flea")) return "tick_flea";
  if (name.includes("bee") || name.includes("wasp")) return "bee_wasp";
  return name;
}

// ===== โหลดรูป =====
window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      preview.src = reader.result;
      preview.style.display = "block";
      base64Image = reader.result.split(",")[1];
    };

    if (file) reader.readAsDataURL(file);
  });
});

// ===== วิเคราะห์ภาพ =====
async function analyze() {
  const result = document.getElementById("result");

  if (!base64Image) {
    result.innerText = texts[currentLang].uploadFirst;
    result.style.color = "red";
    result.className = "";
    return;
  }

  result.innerText = texts[currentLang].analyzing;
  result.style.color = "black";
  result.className = "";

  try {
    const response = await fetch(
      "https://serverless.roboflow.com/s-workspace-2gsnf/workflows/detect-count-and-visualize-3",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: "2HIhObqhiAL5VyBzE0Xb",
          inputs: { image: { type: "base64", value: base64Image } }
        })
      }
    );

    const data = await response.json();
    console.log("RESULT:", data);

    if (data.outputs) {
      const predictions = data.outputs[0]?.predictions?.predictions;

      if (predictions && predictions.length > 0) {
        let insect = predictions[0].class;
        const confidence = (predictions[0].confidence * 100).toFixed(1);

        const key = normalizeInsect(insect);
        const info = treatments[key];

        result.innerHTML = `${texts[currentLang].resultLabel} ${insect} (${confidence}%)`;

        if (info) {
          result.innerHTML += `
            <hr style="margin:10px 0;">
            <div style="text-align:left; font-size:14px; line-height:1.6;">
              <b>${texts[currentLang].suggestedTreatment}</b><br>
              ${info.text[currentLang]}
            </div>
          `;

          if (info.level === "danger") result.classList.add("danger");
          else result.classList.add("success");
        } else {
          result.innerHTML += `<hr><div style="color:#999;">No treatment data available</div>`;
        }

      } else {
        result.innerText = texts[currentLang].noResults;
        result.style.color = "orange";
      }
    } else {
      result.innerText = texts[currentLang].noResults;
      result.style.color = "orange";
    }
  } catch (err) {
    console.error(err);
    result.innerText = "Error";
    result.style.color = "red";
  }
}

// ===== ปุ่มกลับ =====
function goBack() {
  window.location.href = "index.html";
}