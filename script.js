// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Event Handler (Combined) =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar shadow effect
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    // Parallax effect for hero background
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }

    lastScroll = currentScroll;
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
const animateElements = document.querySelectorAll('.about-card, .social-card, .platform-card, .contact-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Form Handling =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('請填寫所有欄位！');
            return;
        }

        // Show success message
        alert('感謝您的訊息！我們會盡快回覆您 ✨');
        contactForm.reset();
    });
}

// ===== Scroll Indicator Animation =====
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== Dynamic Year in Footer =====
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// ===== Mobile Menu Toggle =====
let menuToggleButton = null;

const createMobileMenu = () => {
    const navbarContainer = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');

    if (!navbarContainer || !navMenu) return;

    // Remove existing button if any
    if (menuToggleButton) {
        menuToggleButton.remove();
        menuToggleButton = null;
    }

    // Only create menu toggle for mobile
    if (window.innerWidth <= 900) {
        menuToggleButton = document.createElement('button');
        menuToggleButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggleButton.className = 'mobile-menu-toggle';
        menuToggleButton.setAttribute('aria-label', '切換選單');
        menuToggleButton.setAttribute('aria-expanded', 'false');

        menuToggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            menuToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navbarContainer.appendChild(menuToggleButton);

        if (!navMenu.dataset.mobileHooked) {
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggleButton?.setAttribute('aria-expanded', 'false');
                });
            });
            navMenu.dataset.mobileHooked = 'true';
        }
    } else {
        // Ensure menu is visible on desktop
        navMenu.classList.remove('active');
    }
};

// Initialize mobile menu on load
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', createMobileMenu);

// ===== Episodes Display =====
const episodesData = [
    { number: "S2E11", title: "英文繪本共讀｜感恩湯料理＿Soup Day＿ ft. Isabelle 7Y1M、 Ethan 4Y1M", description: "感恩節特輯！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/6f5b9d3e-8b1e-4c0a-9e1d-3b5f0b5c0d1e" },
    { number: "S2E10", title: "英文繪本共讀 ＆跟著馨聲去旅行 4#｜巧克力女孩之巧克力共和國大揭秘 Chocolatina & Let's go to the chocolate museum !  ft. Isabelle (7Y1M) & Ethan (4Y1M)", description: "｜本集由uMeal優善糧贊助播出｜", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/165b6da9-de3c-4fec-8d88-ac19feb94cb0" },
    { number: "S2E9", title: "跟著馨聲去旅行｜3# 一起去計程車博物館吧！ Let's go to the Taxi Museum ft. Isabelle (7Y1M) & Ethan (4Y1M)", description: "＝本集由宜蘭恆寓包棟民宿贊助播出＝（後面有彩蛋要聽到最後喔）", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/d4bc3154-60fb-4536-b0bb-865e8ab9d5cb" },
    { number: "S2E8", title: "英文繪本共讀｜爆米花萬聖節_ Popcorn_ft. Isabelle (7Y)& Ethan (4Y)", description: "敦煌年度鉅獻：全英文兒童劇-海盜傳奇，閱讀馨聲IG粉專正在快閃抽獎 ，抽出一名幸運的聽眾擁有2張入場券！趕快點我參加！！ [抽獎已結束]", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/c30bde37-6876-4072-ac3d-8924094e8fd7" },
    { number: "S2E7", title: "英文繪本共讀｜恐怖小內褲_ Creepy Pairs of Underwear  ft. Isabelle (7Y0M)", description: "十月假期多、親子摩擦也多？", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/6462b743-4b4f-4fdd-b8ff-1b74b014938d" },
    { number: "S2E6", title: "英文繪本共讀｜章魚逃生記_The Octopus Escapes ft. Isabelle (7Y0M) & Ethan (4Y0M)", description: "十月假期多、親子摩擦也多？", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/74855b21-a9c6-4838-9a92-627c7809fc24" },
    { number: "S2E5", title: "英文繪本共讀｜洗手病毒走＿ Wash Your Hands, Mr. Panda_ft. Isabelle (7Y0M) & Ethan (4Y0M))", description: "＝本集由宜蘭恆寓包棟民宿贊助播出＝", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/35742029-fd6b-4dbb-937e-9bcfe8e9d013" },
    { number: "S2E4", title: "英文繪本共讀｜我的老師是怪獸？！_My Teacher is a monster. No, I am not! _ ft. Isabelle", description: "十月假期多、親子摩擦也多？", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/859b4ef3-1788-4867-81e0-0edb1187d73d" },
    { number: "S2E3", title: "經驗分享｜3# 溫哥華夏令營_ Summer Camps in Vancouver", description: "本輯可以和跟著馨聲去旅行系列 EP26 加拿大日 、 EP29 夏令營遊戲 兩集一同收聽", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/9380bbb1-5c66-435b-babd-fd210ca29c21" },
    { number: "S2E2", title: "英文繪本共讀｜你會挑食嗎？＿I Will Not Ever Never Eat a Tomato ft. Isabelle (6Y11M) & Ethan (3Y11M)", description: "=本集由 uMeal 優善糧 贊助播出=", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/b2a01fdf-70c1-43af-9775-5a444961a05a" },
    { number: "S2E1", title: "英文繪本共讀｜開學第一天 ＿The Mouse's Big Day  ft. Isabelle (6Y11M）& Ethan (3Y11M )", description: "✦✦本集介紹✦✦ （請搭配閱讀馨聲粉專  繪本及作者繪者介紹、共讀筆記 一起收聽）", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/4d2e7e97-707b-4cb8-b24e-232065ed73b4" },
    { number: "EP30", title: "英文繪本共讀｜夏末鐵路遊 ＿There's a Tiger on the Train ft. Isabelle （6Y10M）", description: "=本集由花蓮Bunny Hills 平川里山丘洋房親子民宿 贊助播出=", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/223a3016-6d8a-48d8-93c5-637d2bd8c6e7" },
    { number: "EP29", title: "跟著馨聲去旅行｜2# 夏令營小遊戲 -Stella Ella Ola ft. Isabelle (6Y10M)+Ethan (3Y10M)", description: "✦✦本集介紹✦✦", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/6fa83a5e-c172-48fb-9bd3-19661caafa0d" },
    { number: "EP28", title: "英文繪本共讀｜海馬爸爸愛＿Mister Seahorse", description: "✦✦本集介紹✦✦", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/418640b0-3ccb-45b8-aede-2ebcb3499b55" },
    { number: "EP27", title: "英文繪本共讀｜小蛙學游泳＿Froggy Learns To Swim ft. Isabelle (6Y9M) & Ethan (3Y9M)", description: "✦✦本集介紹✦✦", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/68eead0d-7089-42a4-9e5b-da5c32332b55" },
    { number: "EP26", title: "跟著馨聲去旅行｜1# 加拿大日 Canada Day ft. Isabelle (6Y9M)& Ethan (3Y9M)", description: "=本集由 宸啟閱讀教育 贊助播出=", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/86b8210e-71e2-4c43-b81e-a1cddf966e6e" },
    { number: "EP25", title: "經驗分享｜2# 英繪共讀來時路 part 2 _ 不藏私分享來囉", description: "EP15 英繪共讀來時路 part 1  請搭配 part 1 一同收聽 ：）", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/85e60d24-5d93-4732-b375-c41ca15e5e47" },
    { number: "EP24", title: "英文繪本共讀｜ 小兔「宅」旅行＿Bunny's Staycation ft.  Ethan 3Y8M", description: "=本集由花蓮BunnyHills親子民宿贊助播出=", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/218ac9a9-8199-4d90-b67e-b66de2cc2b74" },
    { number: "EP23", title: "英文繪本共讀｜媽媽我想妳＿Missing mommy   ft. Isabelle 6Y7M", description: "這集我們介紹的英文繪本是——《Missing Mommy》by Rebecca Cobb。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/3b2f5717-4e8e-4643-a16e-486a0057206b" },
    { number: "EP22", title: "英文繪本共讀｜「龍龍」的母愛＿Oh No! Little Dragon_共讀互動版 ft. Ethan 3Y5M", description: "✦✦本集介紹✦✦", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/31f1c178-d75c-4606-b1e4-4cf213ad1b93" },
    { number: "EP22", title: "英文繪本共讀｜「龍龍」的母愛＿OH NO! Little Dragon_完整版（含共讀技巧）ft. Ethan", description: "一隻調皮的小噴火龍，在玩水時不小心把自己的火焰弄熄了！牠急急忙忙想把火找回來，但試了許多方法都徒勞無功...", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/c3212ed2-b534-4051-8512-d860cf5a3be6" },
    { number: "EP21", title: "英文繪本共讀｜阿母的心聲＿How Did You Grow So Big, So Soon? ＿完整版（含共讀技巧） ft. Isabelle", description: "本週很多人敲碗想聽，因為是很少人介紹的繪本，算是閱讀馨聲的獨家，是我從台北市立圖書館挖到的寶喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/2cc83b9b-bd5e-4e43-b5b6-217b5098a1cb" },
    { number: "EP20", title: "英繪共讀｜猴子找媽媽＿Monkey Puzzle＿ 完整版（含共讀技巧）ft. Isabelle", description: "這個禮拜，來繼續介紹母親節繪本喔！！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/06550d0a-c7fd-4713-9dbc-b9489ece258c" },
    { number: "EP19", title: "英繪共讀｜媽媽快回家＿Owl Babies_共讀互動版 ft.Isabelle & Ethan", description: "此為繪本共讀互動版本，特別獨立出來，方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/bf6902b2-44f6-44a3-8937-7118547ce180" },
    { number: "EP19", title: "英文繪本｜媽媽快回家＿Owl Babies＿完整版(含共讀技巧) ft.Isabelle & Ethan", description: "這集邀請小來賓 Isabelle 和 Ethan 來講故事囉！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/566570f7-2464-41c2-9323-6f330550bb01" },
    { number: "EP18", title: "英繪共讀｜我沒有要把你吃掉＿I Will Not Eat You_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來，方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/0572d17d-9b22-4f1a-b61a-6068b3cb6458" },
    { number: "EP18", title: "英文繪本｜我沒有要把你吃掉＿I Will Not Eat You_完整版（含共讀技巧）", description: "在洞穴裡的龍 ——Theodore喜歡待在洞穴裡，不想被打擾。但偏偏每天都有動物經過...", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/2ad9c287-fb73-4cf6-a7a0-eb6fb6e215f1" },
    { number: "EP17", title: "英文繪本｜一顆奇特的蛋_An extraordinary egg_共讀互動版", description: "📘🥚🐊 此為繪本共讀互動版本，特別獨立出來，方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/2e5a74c7-52d7-4eb0-b401-75825fdadc0f" }
];

// Add remaining episodes (continuing from EP17 to EP0)
episodesData.push(
    { number: "EP17", title: "英文繪本｜一顆奇特的蛋＿An Extraordinary Egg (含共讀技巧）", description: "這個禮拜節目稍微做了一些小改變喔～", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/d38d93e3-3768-4f8a-a59e-8c37745bb37b" },
    { number: "EP16", title: "英文繪本｜我的幸運日_My Lucky Day_完整版（含共讀技巧）", description: "2025/4/19 Tr.Peggy 要去林森二手親子市集講故事囉！繪本就是這一集 My Lucky Day!", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/75149157-b403-4fb7-bf61-c472572c970b" },
    { number: "EP16", title: "英文繪本｜我的幸運日_My Lucky Day_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/a812ccf5-a200-447b-901c-fc3f2286ad5f" },
    { number: "EP15", title: "經驗分享｜1# 英繪共讀來時路 pt.1_不藏私分享來了", description: "這集來不藏私地分享我的英文繪本共讀經驗，會先分享：", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/568694d5-ae0c-4bce-af69-da97831ddc4d" },
    { number: "EP14", title: "英文繪本｜梵谷藝術賞_Katie and the Starry Night_完整版（含閱讀技巧）", description: "這個週末是梵谷的生日（3/30），閱讀馨聲選讀了一本和梵谷有關的藝術類繪本...", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/2d3de0cb-4309-4e0d-a82c-dc8a73079e28" },
    { number: "EP13", title: "英文繪本｜便便怎麼來？_Amy Gets Eaten _完整版（含共讀技巧）", description: "這個禮拜Peggy重感冒失聲，延遲上架的部分終於出爐囉！！！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/ab48884d-56ee-466b-876b-7126fea9c1c7" },
    { number: "EP13", title: "英文繪本｜便便怎麼來？＿Amy Gets Eaten_共讀互動版", description: "🚽🚽此為繪本共讀互動版本，特別獨立出來方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/79d8b363-0ced-4d6f-b5f4-6ecafbcb550d" },
    { number: "EP12", title: "英文繪本｜白色情人節＿Love Monster and the Last Chocolate（共讀互動版）", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放給孩子聽喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/dfaa8af4-18c1-4268-973c-083f7e2fefa5" },
    { number: "EP12", title: "英文繪本｜ 白色情人節＿Love Monster and the Last Chocolate＿完整版（含共讀技巧）", description: "各位閱讀馨聲的聽眾白色情人節快樂～！Happy White Day ! 🤍 🧡 💛 💚 💙 🩵 💜 🤎", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/d88b35ae-27ff-49b3-9e5c-74258352a47d" },
    { number: "EP11", title: "英文繪本｜穿什麼我決定！＿Mary Wears What She Wants! ＿完整版（含共讀技巧）", description: "這本繪本在講200多年前的女權鬥士Mary Ｗalker為女性爭取穿褲子的權利的故事，", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/671ff799-d0a8-43d1-b131-00243015531a" },
    { number: "EP11", title: "英文繪本｜穿什麼我決定！_Mary Wears What She Wants! ＿共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/e1ac99ac-305b-4693-980e-84479aa560b3" },
    { number: "EP10", title: "英文繪本｜黑象與白象_Tusk Tusk_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/52a08988-ed76-4c73-8221-aa1ef1ca5ead" },
    { number: "EP10", title: "英文繪本｜黑象與白象＿Tusk Tusk＿完整版（含共讀技巧）", description: "EP10", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/512a3ef3-333e-42d5-ac22-141c44e66f8c" },
    { number: "EP09", title: "英文繪本｜小老鼠不害怕_The Mouse Who Wasn't Scared _共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放喔！！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/832aa730-0932-4c4e-87ce-e69f588a03ae" },
    { number: "EP09", title: "英文繪本｜小老鼠不害怕＿The Mouse Who Wasn't Scared_完整版(含共讀技巧)", description: "EP9", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/ba5e6955-b6ad-417a-94de-b4ae218d83f0" },
    { number: "EP08", title: "英文繪本｜猜猜我有多愛你＿Guess how much I love you_ 完整版💗（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/8d3ccb7b-385b-4130-9d45-ac073ee8a575" },
    { number: "EP08", title: "英文繪本｜猜猜我有多愛你_Guess how much I love you_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/1f4bb810-4cff-4c62-8ffc-cdd9362cab9d" },
    { number: "EP07", title: "英文繪本｜猩猩抓狂了＿Betty goes bananas 🍌_ 共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放給孩子聽喔！", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/c80691dd-bb0f-44c1-ae18-c520d7779e9c" },
    { number: "EP07", title: "英文繪本｜ 猩猩抓狂了＿Betty goes bananas＿完整版🍌（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/ee1b6d2e-ec80-445d-9aec-2c06ffdd4e5a" },
    { number: "EP06", title: "英文繪本｜小兔說不要_NO ! said Rabbit_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/ec70b261-6c48-4884-8c48-33eb9a119337" },
    { number: "EP06", title: "英文繪本｜小兔說不要_NO! said Rabbit＿完整版（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/74d70814-82ed-4446-88a3-d57c9e89f94a" },
    { number: "EP05", title: "英文繪本｜青蛙呱呱呱_The Wide Mouthed Frog_共讀互動版", description: "閱讀馨聲-kidsbooksholic", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/2f469590-dce0-4c58-8e12-2a491766358f" },
    { number: "EP05", title: "英文繪本｜青蛙呱呱呱_The Wide-mouthed frog_完整版（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/314a0f50-d338-41bb-acd7-54f2e8610606" },
    { number: "EP04", title: "英文繪本｜大熊不洗澡_Big Smelly Bear_共讀互動版", description: "此為繪本共讀互動版本，特別獨立出來方便家長直接播放", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/9ffba609-d5fd-4dc6-b656-63708415dc9d" },
    { number: "EP04", title: "英文繪本｜大熊不洗澡_Big Smelly Bear_完整版（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/82eb1fea-de8c-498b-a95a-a6abee7f4587" },
    { number: "EP03", title: "英文繪本｜草間彌生_ Yayoi Kusama Covered Everything in Dots and Wasn't Sorry _繪本朗讀版", description: "＊繪本朗讀版/共讀互動版為Peggy親子唸的故事音檔，", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/50d76b65-c1ab-4bc1-b7a4-06df2307ea20" },
    { number: "EP03", title: "英文繪本｜草間彌生_Yayoi Kusama Covered Everything in Dots and Wan't Sorry＿完整版（含共讀技巧）", description: "你知道草間彌生是誰嗎？這位已經高齡96歲、以「圓點」風靡全球的當代女性藝術家-草間彌生...", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/03751f9c-9e3c-4117-a0c0-39f9e8c5762b" },
    { number: "EP02", title: "英文繪本｜內褲不見了_Polar Bear's Underwear_共讀互動版", description: "此為 繪本故事共讀互動版本，特別獨立出來方便家長直接播放～", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/bdd5e99b-99b9-4cb9-91a5-b666e3bf5916" },
    { number: "EP02", title: "英文繪本｜內褲不見了_Polar Bear's Underwear_完整版（含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/cba2fede-7e17-43bc-a865-8a6e7636591f" },
    { number: "EP01", title: "英文繪本｜鼻子不見了_Santa's Reindeer _完整版 ( 含共讀技巧）", description: "＊完整版主要受眾為孩子的照顧者，可以是父母、阿公阿嬤、保母、陪玩姊姊、學校的老師等。", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/1b6dcac9-06f2-4e34-9a42-d2a11a29cbca" },
    { number: "EP01", title: "英文繪本｜鼻子不見了_Santa's Reindeer_共讀互動版", description: "此為 繪本故事共讀互動版本，特別獨立出來方便家長直接播放", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/eab24bcb-d80d-4df6-9b2e-6eddc6bf517d" },
    { number: "EP0", title: "節目介紹｜閱讀馨聲- kidsbooksholic 跟大家說哈囉！", description: "各位新朋友、老朋友好久不見，", link: "https://player.soundon.fm/p/ca75157b-90d1-48de-877b-72520bd27f8d/episodes/c5598ed1-0450-4565-867c-dd50f49d33d3" }
);

let filteredEpisodes = [...episodesData];
let currentPage = 1;
const episodesPerPage = 9;

function renderEpisodes() {
    const episodesGrid = document.getElementById('episodesGrid');
    const startIndex = (currentPage - 1) * episodesPerPage;
    const endIndex = startIndex + episodesPerPage;
    const episodes = filteredEpisodes.slice(startIndex, endIndex);

    if (episodes.length === 0) {
        episodesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>找不到符合的集數</p>
            </div>
        `;
        return;
    }

    episodesGrid.innerHTML = episodes.map(ep => `
        <div class="episode-card">
            <span class="episode-number">${ep.number}</span>
            <h5 class="episode-title">${ep.title}</h5>
            <p class="episode-description">${ep.description}</p>
            <a href="${ep.link}" class="episode-link" target="_blank" rel="noopener">
                <i class="fas fa-play-circle"></i>
                收聽
            </a>
        </div>
    `).join('');

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);
    const pagination = document.getElementById('pagination');

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i> 上一頁
        </button>
    `;

    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += '<span>...</span>';
        }
    }

    paginationHTML += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            下一頁 <i class="fas fa-chevron-right"></i>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    renderEpisodes();
    document.getElementById('episodesGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Search functionality
const searchInput = document.getElementById('episodeSearch');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredEpisodes = episodesData.filter(ep =>
            ep.number.toLowerCase().includes(searchTerm) ||
            ep.title.toLowerCase().includes(searchTerm) ||
            ep.description.toLowerCase().includes(searchTerm)
        );

        currentPage = 1;
        document.getElementById('episodeCount').textContent = `共 ${filteredEpisodes.length} 集`;
        renderEpisodes();
    });
}

// Initialize episodes display
window.addEventListener('load', () => {
    if (document.getElementById('episodesGrid')) {
        const episodeCountLabel = document.getElementById('episodeCount');
        if (episodeCountLabel) {
            episodeCountLabel.textContent = `共 ${episodesData.length} 集`;
        }
        renderEpisodes();
    }
});


// ===== Easter Egg: Konami Code =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('🎉 你發現了隱藏彩蛋！感謝你的探索精神！');
        }, 2000);
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('✨ 歡迎來到閱讀馨聲 - Kidsbooksholic！');
console.log('💡 小提示：試試看 Konami Code 會發生什麼事？');
