// ─── Answer options (shared across all categories) ──────────────────────────
export const ANSWER_OPTIONS = [
  { value: 'A', label: 'Rarely or Never', score: 1 },
  { value: 'B', label: 'Sometimes',       score: 2 },
  { value: 'C', label: 'Often',           score: 3 },
  { value: 'D', label: 'Almost Always',   score: 4 },
]

// ─── Category definitions ─────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    id: 'student',
    label: 'Children and Students',
    ageRange: '10 – 16 years',
    icon: '📚',
    description: 'For school-going students aged 10 to 16',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    id: 'young-adult',
    label: 'Youngsters and Gen Z',
    ageRange: '17 – 25 years',
    icon: '🎓',
    description: 'For college students and young adults aged 17 to 25',
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
  },
  {
    id: 'married',
    label: 'Adult & Couples',
    ageRange: 'All ages',
    icon: '💍',
    description: 'For adults and couples assessing individual and relationship wellbeing',
    color: 'from-rose-500 to-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
  {
    id: 'divorced',
    label: 'Working Professionals',
    ageRange: 'All ages',
    icon: '💼',
    description: 'For working professionals managing career stress and work-life balance',
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    id: 'older',
    label: 'Senior Citizens',
    ageRange: '55+ years',
    icon: '🌟',
    description: 'For older adults aged 55 and above',
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  {
    id: 'single-mother',
    label: 'Single Parents',
    ageRange: 'All ages',
    icon: '🤝',
    description: 'For single parents navigating the unique challenges of solo parenting',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    id: 'counselling-10th',
    label: 'Counselling for 10th',
    ageRange: '15 – 16 years',
    icon: '📖',
    description: 'Career aptitude and interest assessment for 10th standard students',
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    id: 'counselling-12th',
    label: 'Counselling for 12th',
    ageRange: '17 – 18 years',
    icon: '🏫',
    description: 'Career direction and college readiness assessment for 12th standard students',
    color: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
]

// ─── Student 10–16 questionnaire ──────────────────────────────────────────────
const studentQuestions = [
  // Part 1: Mood and Emotions
  {
    id: 1,
    part: 'Part 1: Mood and Emotions',
    text: 'How often do you feel sad, empty, or feel like crying for no clear reason?',
    indicator: 'Frequent sadness can be a sign of low mood or depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Mood and Emotions',
    text: 'How often do you feel easily annoyed, frustrated, or angry at friends or family over small things?',
    indicator: 'In teens and pre-teens, depression and anxiety often show up as irritability rather than just sadness.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Mood and Emotions',
    text: 'How often do you feel bored or completely uninterested in hobbies or activities you usually love?',
    indicator: 'A loss of interest (anhedonia) is a strong indicator of emotional fatigue or depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Mood and Emotions',
    text: 'How often do you feel like your emotions are like a rollercoaster and completely out of your control?',
    indicator: 'Difficulty with emotional regulation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Mood and Emotions',
    text: 'How often do you feel hopeful and positive about your future?',
    indicator: 'A lack of hope can indicate feelings of despair or depressive thinking. (For this question, "Rarely/Never" is the concern.)',
    reversed: true,
    safetyQuestion: false,
  },

  // Part 2: Anxiety and Stress
  {
    id: 6,
    part: 'Part 2: Anxiety and Stress',
    text: 'How often do you worry about things going wrong, even when things are currently fine?',
    indicator: 'Measures generalized anxiety and overthinking.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Anxiety and Stress',
    text: 'How often do you feel a sudden, racing heartbeat or panic when facing a normal daily task (like a test or talking in class)?',
    indicator: 'Physical symptoms of acute anxiety or panic.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Anxiety and Stress',
    text: 'How often do you feel like everyday life or school expectations are just "too much" to handle?',
    indicator: 'General feelings of being overwhelmed or burnt out.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Anxiety and Stress',
    text: 'How often do you overthink what other people think of you?',
    indicator: 'Measures social anxiety and peer-related stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Anxiety and Stress',
    text: 'When you feel overwhelmed, how often do you feel like you have to deal with it completely alone?',
    indicator: "Evaluates the student's perceived support system and isolation.",
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Physical Well-being and Habits
  {
    id: 11,
    part: 'Part 3: Physical Well-being and Habits',
    text: 'How often do you have trouble falling asleep, staying asleep, or waking up feeling exhausted?',
    indicator: 'Sleep disruption is one of the most common early indicators of mental health struggles.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Physical Well-being and Habits',
    text: 'How often do you feel too physically tired or drained to get out of bed or do basic chores?',
    indicator: 'Measures energy levels, which can be depleted by stress or depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Physical Well-being and Habits',
    text: 'How often do you get unexplained stomachaches, headaches, or muscle tension when you are stressed?',
    indicator: 'Physical manifestation of anxiety (somatic symptoms).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Physical Well-being and Habits',
    text: 'How often do you notice sudden changes in your appetite (eating way more than usual or totally losing your appetite)?',
    indicator: 'Changes in eating habits are a core indicator of emotional distress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Physical Well-being and Habits',
    text: 'How often do you feel so frustrated that you have the urge to break things or hurt yourself?',
    indicator: 'A direct safety indicator — if you answered C or D, please speak with a trusted adult or counsellor immediately.',
    reversed: false,
    safetyQuestion: true,
  },

  // Part 4: Social and Academic Life
  {
    id: 16,
    part: 'Part 4: Social and Academic Life',
    text: 'How often do you find it difficult to concentrate, focus, or remember things for your schoolwork?',
    indicator: 'Cognitive impact of stress, anxiety, or attention issues.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Social and Academic Life',
    text: 'How often do you want to avoid or skip school because you feel too anxious, sad, or overwhelmed?',
    indicator: 'School refusal or avoidance behaviour.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Social and Academic Life',
    text: 'How often do you prefer to isolate yourself in your room rather than hanging out with friends or family?',
    indicator: 'Social withdrawal, a common coping mechanism for depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Social and Academic Life',
    text: 'How often do you feel misunderstood, judged, or left out by people your own age?',
    indicator: 'Measures social belonging and self-esteem.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Social and Academic Life',
    text: 'How often do you feel like you are not "good enough" or compare yourself negatively to others?',
    indicator: 'Assesses core self-esteem and self-worth.',
    reversed: false,
    safetyQuestion: false,
  },
]

// ─── Young Adult 17–25 questionnaire ─────────────────────────────────────────
const youngAdultQuestions = [
  // Part 1: Mood and Emotional Regulation
  {
    id: 1,
    part: 'Part 1: Mood and Emotional Regulation',
    text: 'How often do you feel a lingering sense of sadness, emptiness, or feeling "flat"?',
    indicator: 'Pervasive low mood is a primary indicator of depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Mood and Emotional Regulation',
    text: 'How often do you feel completely uninterested in hobbies, social events, or passions that you used to enjoy?',
    indicator: 'Anhedonia (loss of pleasure), a core symptom of depressive disorders.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Mood and Emotional Regulation',
    text: 'How often do you feel emotionally numb or disconnected from yourself and your surroundings?',
    indicator: 'Emotional blunting or dissociation, often linked to severe stress, trauma, or burnout.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Mood and Emotional Regulation',
    text: 'How often do you experience sudden outbursts of anger or severe irritability over minor inconveniences?',
    indicator: 'Emotional dysregulation; depression and anxiety in young adults often manifest as anger rather than just sadness.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Mood and Emotional Regulation',
    text: 'How often do you feel hopeless or deeply cynical about your future?',
    indicator: 'A lack of hope can indicate depressive thinking or existential distress.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: Academic, Career, and Performance Stress
  {
    id: 6,
    part: 'Part 2: Academic, Career, and Performance Stress',
    text: 'How often do you feel like a fraud who doesn\'t belong in your academic program or job, and worry you\'ll be "found out"?',
    indicator: 'Imposter syndrome, which severely impacts self-esteem and increases baseline anxiety.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Academic, Career, and Performance Stress',
    text: 'How often do you feel completely paralyzed by the amount of work you have to do, leading you to avoid it entirely?',
    indicator: 'Avoidance behavior and executive dysfunction, often caused by overwhelming anxiety or ADHD.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Academic, Career, and Performance Stress',
    text: 'How often do you feel completely drained, cynical, and exhausted regarding your studies or work?',
    indicator: 'Academic or occupational burnout.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Academic, Career, and Performance Stress',
    text: 'How often do you experience a racing mind that prevents you from relaxing, even when you have free time?',
    indicator: 'Generalized anxiety and an inability to down-regulate the nervous system.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Academic, Career, and Performance Stress',
    text: 'How often do you have sudden episodes of intense physical panic (racing heart, shortness of breath, dizziness) in non-dangerous situations?',
    indicator: 'Panic attacks or acute panic disorder.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Social Dynamics and Interpersonal Health
  {
    id: 11,
    part: 'Part 3: Social Dynamics and Interpersonal Health',
    text: 'How often do you intentionally isolate yourself from friends or roommates because interacting feels too exhausting?',
    indicator: 'Social withdrawal, a common coping mechanism for depression and sensory overload.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Social Dynamics and Interpersonal Health',
    text: 'How often do you excessively worry about being judged, criticized, or rejected by your peers?',
    indicator: 'Social anxiety and fear of negative evaluation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Social Dynamics and Interpersonal Health',
    text: 'How often do you look at social media and feel intense inadequacy, jealousy, or distress about where you are in life compared to others?',
    indicator: 'The "comparison trap," which heavily degrades self-worth in young adults.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Social Dynamics and Interpersonal Health',
    text: 'When you are struggling, how often do you feel like you have to hide it because no one would understand or care?',
    indicator: 'Perceived isolation and a lack of a safe support system.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Physical Symptoms and Coping Mechanisms
  {
    id: 15,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you struggle with sleep (taking hours to fall asleep, waking up constantly, or sleeping significantly more than usual)?',
    indicator: 'Sleep disturbance is a primary physiological marker of both anxiety and depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 16,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you experience physical symptoms like tension headaches, unexplained stomach issues, or a tight chest when stressed?',
    indicator: 'Somatization (psychological stress manifesting as physical pain).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you experience "brain fog," making it difficult to concentrate, read, or remember simple information?',
    indicator: 'Cognitive impairment caused by prolonged stress, depression, or burnout.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you notice significant changes in your eating habits (restricting food, binge eating, or entirely losing your appetite)?',
    indicator: 'Disordered eating patterns often used to regain a sense of control, or physiological appetite loss due to stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you use substances (alcohol, marijuana, vaping) or compulsive behaviors (doom-scrolling, gaming) specifically to numb out or escape your feelings?',
    indicator: 'Maladaptive (unhealthy) coping mechanisms and risk of substance dependency.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you have thoughts that you would be better off dead, or have urges to physically harm yourself?',
    indicator: 'Severe depressive crisis, suicidality, or self-harm. This requires immediate professional intervention — please reach out to a trusted person or crisis resource now.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Married / Live-in questionnaire (full 20 questions) ─────────────────────
const marriedQuestions = [
  // Part 1: Individual Well-Being & Identity
  {
    id: 1,
    part: 'Part 1: Individual Well-Being & Identity',
    text: 'How often do you feel emotionally exhausted, empty, or drained, regardless of what is happening at home?',
    indicator: 'Assesses baseline individual depression or burnout, independent of the relationship.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Individual Well-Being & Identity',
    text: 'How often do you feel like you have lost your individual identity, hobbies, or sense of self since being in this relationship?',
    indicator: 'Enmeshment or loss of self, which can lead to resentment and low self-worth.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Individual Well-Being & Identity',
    text: 'How often do you feel overwhelmed by your daily responsibilities (work, chores, life admin) and feel entirely alone in managing them?',
    indicator: 'Mental load imbalance, a primary driver of chronic stress and anxiety in cohabiting couples.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Individual Well-Being & Identity',
    text: 'How often do you experience physical symptoms of stress (tension headaches, stomach issues, insomnia) specifically when thinking about your home life?',
    indicator: 'Somatic (physical) manifestation of relational anxiety or chronic stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Individual Well-Being & Identity',
    text: 'How often do you feel a general sense of hopelessness about your personal future or the future of your life together?',
    indicator: 'A lack of hope can indicate depressive thinking or deep relational despair.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: Communication and Conflict
  {
    id: 6,
    part: 'Part 2: Communication and Conflict',
    text: 'How often do you feel like you are "walking on eggshells" to avoid upsetting your partner or starting a fight?',
    indicator: 'Fear-based communication and anxiety; lack of psychological safety in the home.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Communication and Conflict',
    text: 'How often do minor disagreements escalate quickly into major arguments involving yelling, name-calling, or bringing up past mistakes?',
    indicator: 'Poor conflict regulation and emotional dysregulation within the partnership.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Communication and Conflict',
    text: 'How often do you feel completely unheard, dismissed, or invalidated when you express your feelings to your partner?',
    indicator: 'Stonewalling or defensiveness, which severely damages emotional connection.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Communication and Conflict',
    text: 'How often do arguments end in a cold war (silent treatment) without any real resolution, repair, or genuine apology?',
    indicator: 'Inability to repair after ruptures; leads to built-up resentment and emotional distance.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Communication and Conflict',
    text: 'How often do you find yourself hiding things (like purchases, conversations with friends, or your true feelings) just to keep the peace?',
    indicator: 'Avoidance behavior and erosion of basic trust.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Intimacy, Connection, and Support
  {
    id: 11,
    part: 'Part 3: Intimacy, Connection, and Support',
    text: 'How often do you feel more like roommates managing a household together rather than romantic partners?',
    indicator: 'Emotional disconnection and the erosion of the romantic/intimate bond.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Intimacy, Connection, and Support',
    text: 'How often does a mismatch in your physical intimacy or sex drive cause active distress, guilt, or pressure in your relationship?',
    indicator: 'Intimacy incompatibility or lack of safe, pressure-free physical connection.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Intimacy, Connection, and Support',
    text: 'How often do you feel that your partner is more of a critic of your life choices/goals rather than your biggest supporter?',
    indicator: 'Lack of emotional safety and support; presence of contempt or criticism.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Intimacy, Connection, and Support',
    text: 'When something terrible or stressful happens to you outside of the home, how often do you prefer to handle it alone rather than seeking comfort from your partner?',
    indicator: 'Breakdown of the partner as a "secure base" or primary attachment figure.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Intimacy, Connection, and Support',
    text: 'How often do you dread coming home or actively look for reasons to spend time away from your partner?',
    indicator: 'Active avoidance; the home environment is perceived as a stressor rather than a sanctuary.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Relational Impact and Safety
  {
    id: 16,
    part: 'Part 4: Relational Impact and Safety',
    text: 'How often do you blame yourself for your partner\'s bad moods, feeling like it is your job to "fix" their emotional state?',
    indicator: 'Codependency and anxious attachment dynamics.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Relational Impact and Safety',
    text: 'How often do you feel unfairly criticized, mocked, or demeaned by your partner (either in private or in front of others)?',
    indicator: 'Emotional verbal abuse and contempt (the highest predictor of relationship failure).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Relational Impact and Safety',
    text: 'How often do you catch yourself fantasizing about leaving the relationship, living alone, or starting over just to find peace?',
    indicator: 'Active detachment and emotional exit from the relationship.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Relational Impact and Safety',
    text: 'How often does your partner try to control who you see, monitor your phone/finances, or isolate you from friends and family?',
    indicator: 'Coercive control and emotional abuse — a critical safety indicator. Please reach out to a domestic abuse resource or trusted professional.',
    reversed: false,
    safetyQuestion: true,
  },
  {
    id: 20,
    part: 'Part 4: Relational Impact and Safety',
    text: 'How often do you feel physically intimidated by your partner, afraid of their temper, or fearful that an argument might turn physically aggressive?',
    indicator: 'Domestic violence risk and severe lack of physical/emotional safety — a critical safety indicator. Please prioritize your safety and reach out for help.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Divorced / Separated questionnaire (placeholder — 10 questions) ─────────
const divorcedQuestions = [
  {
    id: 1, part: 'Part 1: Coping with Change',
    text: 'How often do you feel grief or loss over the end of your relationship?',
    indicator: 'Grief is a natural response to separation.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 2, part: 'Part 1: Coping with Change',
    text: 'How often do you feel confident about managing your life independently?',
    indicator: '"Rarely/Never" is the concern here — low confidence after separation.',
    reversed: true, safetyQuestion: false,
  },
  {
    id: 3, part: 'Part 1: Coping with Change',
    text: 'How often do thoughts about the past relationship interfere with your daily life?',
    indicator: 'Intrusive thoughts can indicate unresolved emotional distress.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 4, part: 'Part 2: Emotional State',
    text: 'How often do you feel a deep sense of sadness or emptiness?',
    indicator: 'Persistent sadness may indicate depression following a major life change.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 5, part: 'Part 2: Emotional State',
    text: 'How often do you feel angry or resentful about how things turned out?',
    indicator: 'Unresolved anger is common after separation but needs to be addressed.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 6, part: 'Part 3: Social Support',
    text: 'How often do you feel completely alone in dealing with your situation?',
    indicator: 'Perceived isolation increases risk of emotional decline.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 7, part: 'Part 3: Social Support',
    text: 'How often do you feel embarrassed or judged by people in your social circle?',
    indicator: 'Social stigma can compound distress during separation.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 8, part: 'Part 4: Physical & Practical',
    text: 'How often do you have difficulty sleeping or feel constantly fatigued?',
    indicator: 'Physical signs of emotional stress.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 9, part: 'Part 4: Physical & Practical',
    text: 'How often do you feel overwhelmed by new financial or practical responsibilities?',
    indicator: 'Practical stress compounds emotional wellbeing after separation.',
    reversed: false, safetyQuestion: false,
  },
  {
    id: 10, part: 'Part 4: Physical & Practical',
    text: 'How often do you feel hopeful that life will get better?',
    indicator: '"Rarely/Never" indicates low hope — a key indicator of emotional distress.',
    reversed: true, safetyQuestion: false,
  },
]

// ─── Senior Adult questionnaire (full 20 questions) ──────────────────────────
const olderQuestions = [
  // Part 1: Mood, Grief, and Emotional Well-Being
  {
    id: 1,
    part: 'Part 1: Mood, Grief, and Emotional Well-Being',
    text: 'How often do you feel a deep sense of sadness, emptiness, or find yourself crying for no clear reason?',
    indicator: 'Pervasive low mood is a primary indicator of depression, which is not a normal part of aging.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Mood, Grief, and Emotional Well-Being',
    text: 'How often do you feel completely uninterested in hobbies, reading, or activities that used to bring you joy?',
    indicator: 'Anhedonia (loss of pleasure). In seniors, dropping long-time hobbies is a major red flag for depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Mood, Grief, and Emotional Well-Being',
    text: 'How often do you feel that you are a burden to your family, friends, or caregivers?',
    indicator: 'Feelings of worthlessness or guilt, which heavily degrade self-esteem and drive depressive thinking.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Mood, Grief, and Emotional Well-Being',
    text: 'How often do you feel a sense of hopelessness, feeling like your best years are behind you and there is nothing to look forward to?',
    indicator: 'A lack of hope can indicate despair and a struggle to find meaning in this stage of life.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Mood, Grief, and Emotional Well-Being',
    text: 'How often do you feel unusually irritable, short-tempered, or frustrated with the people around you?',
    indicator: 'Emotional dysregulation; depression in older adults often manifests as grumpiness or irritability rather than just sadness.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: Social Connection and Isolation
  {
    id: 6,
    part: 'Part 2: Social Connection and Isolation',
    text: 'How often do you feel lonely, even when you are talking to someone on the phone or sitting in a room with other people?',
    indicator: 'Emotional isolation and the subjective feeling of loneliness, which is a major health risk for seniors.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Social Connection and Isolation',
    text: 'How often do you intentionally avoid answering the phone, attending family gatherings, or seeing friends?',
    indicator: 'Social withdrawal, a common coping mechanism for depression and anxiety.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Social Connection and Isolation',
    text: 'How often do you feel forgotten, left behind, or disconnected from the younger generations in your family or community?',
    indicator: 'Measures social belonging and the psychological impact of generational isolation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Social Connection and Isolation',
    text: 'How often do you feel like you have no one you can truly talk to about your deep feelings, fears, or grief?',
    indicator: "Evaluates the individual's perceived emotional support system.",
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Social Connection and Isolation',
    text: 'How often do you feel a profound sense of loss regarding your purpose in life (e.g., after retirement, or after the loss of a spouse/friends)?',
    indicator: "Identity loss and grief; struggling to redefine one's self-worth in later life.",
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Anxiety, Worry, and Physical Health
  {
    id: 11,
    part: 'Part 3: Anxiety, Worry, and Physical Health',
    text: 'How often do you find yourself excessively worrying about your physical health, constantly fearing that a minor ache is a severe illness?',
    indicator: 'Health anxiety (hypochondriasis), which is very common and distressing in older populations.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Anxiety, Worry, and Physical Health',
    text: 'How often do you worry excessively about your living arrangements, finances, or ability to afford care in the future?',
    indicator: 'Generalized anxiety regarding security and loss of control.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Anxiety, Worry, and Physical Health',
    text: 'How often do you struggle with sleep, such as waking up very early in the morning and being unable to go back to sleep?',
    indicator: 'Early morning awakening is a classic physiological symptom of clinical depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Anxiety, Worry, and Physical Health',
    text: 'How often do you experience unexplained physical symptoms (like extreme fatigue, stomachaches, or vague pains) that your doctor cannot find a medical reason for?',
    indicator: 'Somatization; older adults frequently express psychological distress through physical complaints rather than emotional ones.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Anxiety, Worry, and Physical Health',
    text: 'How often do you notice you have completely lost your appetite, or find that eating has become a chore?',
    indicator: 'Changes in appetite and unintended weight loss are critical physical markers of late-life depression.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Independence and Cognitive Anxiety
  {
    id: 16,
    part: 'Part 4: Independence and Cognitive Anxiety',
    text: 'How often do you feel intense anxiety, embarrassment, or panic when you forget a name, misplace an item, or lose your train of thought?',
    indicator: 'Anxiety regarding cognitive decline (fear of dementia), which can sometimes cause more distress than the memory lapse itself.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Independence and Cognitive Anxiety',
    text: 'How often do you feel deeply frustrated or angry about your body not being able to do the things it used to do (e.g., driving, walking, household chores)?',
    indicator: 'Grief over the loss of physical independence and mobility.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Independence and Cognitive Anxiety',
    text: 'How often do you find it difficult to concentrate on simple tasks, like reading a newspaper, watching a television show, or following a conversation?',
    indicator: 'Cognitive impairment, which can be caused by early dementia, but is also a very common symptom of severe depression (pseudodementia).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Independence and Cognitive Anxiety',
    text: 'How often do you feel entirely overwhelmed by managing your daily routine, such as organizing medications, paying bills, or making meals?',
    indicator: 'Executive dysfunction and feelings of being overwhelmed by life\'s basic demands.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Independence and Cognitive Anxiety',
    text: 'How often do you have thoughts that you would be better off dead, or wish you could just go to sleep and not wake up?',
    indicator: 'Passive or active suicidal ideation — this requires immediate professional intervention. Please reach out to a physician, mental health professional, or crisis hotline now.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Working Professional questionnaire (full 20 questions) ──────────────────
const workingProfessionalQuestions = [
  // Part 1: Burnout and Occupational Stress
  {
    id: 1,
    part: 'Part 1: Burnout and Occupational Stress',
    text: 'How often do you feel a sense of dread when waking up on a workday, or spend your Sunday deeply anxious about Monday?',
    indicator: '"Sunday Scaries" or morning dread are classic early warning signs of occupational burnout and chronic workplace stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Burnout and Occupational Stress',
    text: 'How often do you feel completely emotionally drained and depleted by the end of the workday, leaving nothing in the tank for your personal life?',
    indicator: 'Emotional exhaustion, which is the primary and most prominent dimension of burnout.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Burnout and Occupational Stress',
    text: 'How often do you feel cynical, detached, or resentful toward your work, your colleagues, or your clients/customers?',
    indicator: 'Depersonalization and loss of empathy; a defense mechanism when the brain is chronically overwhelmed by work.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Burnout and Occupational Stress',
    text: 'How often do you feel like you are failing or incompetent at your job, despite evidence of your achievements or positive feedback?',
    indicator: 'Imposter syndrome and a reduced sense of personal accomplishment.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Burnout and Occupational Stress',
    text: 'How often do you find it impossible to "switch off" from work during your evenings, weekends, or vacations (e.g., obsessively checking emails or Slack)?',
    indicator: 'Erosion of work-life boundaries and inability to psychologically detach from stressors.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: Mood and Emotional Well-Being
  {
    id: 6,
    part: 'Part 2: Mood and Emotional Well-Being',
    text: 'How often do you feel a lingering sense of sadness, emptiness, or a "flat" mood that persists throughout the week?',
    indicator: 'Pervasive low mood is a core indicator of clinical depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Mood and Emotional Well-Being',
    text: 'How often do you lack the energy or desire to participate in hobbies, socializing, or activities you used to enjoy outside of work?',
    indicator: 'Anhedonia (loss of pleasure). When work consumes all energy, losing interest in personal joys is a major red flag.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Mood and Emotional Well-Being',
    text: 'How often do you find yourself snapping at coworkers, your partner, or your children over minor frustrations?',
    indicator: 'Emotional dysregulation; depression and chronic stress frequently manifest as irritability and a shortened temper.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Mood and Emotional Well-Being',
    text: 'How often do you feel hopeless about your career trajectory or your life in general?',
    indicator: 'A lack of hope can indicate depressive thinking or deep career stagnation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Mood and Emotional Well-Being',
    text: 'How often do you feel that no matter how hard you work, your efforts are unappreciated, unseen, or pointless?',
    indicator: 'Lack of reward and recognition, which drives both depression and workplace resentment.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Anxiety and Cognitive Function
  {
    id: 11,
    part: 'Part 3: Anxiety and Cognitive Function',
    text: 'How often do you experience a racing mind, constantly worrying about making mistakes, missing deadlines, or your job security?',
    indicator: 'Generalized or workplace-specific anxiety; hyper-vigilance.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Anxiety and Cognitive Function',
    text: 'How often do you experience "brain fog," making it difficult to concentrate during meetings, read documents, or remember tasks?',
    indicator: 'Cognitive impairment, a very common biological response to prolonged cortisol (stress hormone) exposure.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Anxiety and Cognitive Function',
    text: 'How often do you feel so paralyzed by the amount of work on your plate that you end up procrastinating or avoiding it entirely?',
    indicator: 'Executive dysfunction and anxiety-driven avoidance behavior.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Anxiety and Cognitive Function',
    text: 'How often do you experience physical signs of panic (racing heart, shortness of breath, sweating) before a meeting, presentation, or opening an email?',
    indicator: 'Acute anxiety or panic responses triggered by workplace stimuli.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Anxiety and Cognitive Function',
    text: 'How often do you overthink or excessively obsess over conversations you had with your boss or colleagues, fearing you said the wrong thing?',
    indicator: 'Rumination and social/professional anxiety.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Physical Symptoms and Coping Mechanisms
  {
    id: 16,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you struggle with sleep, such as lying awake thinking about your to-do list, or waking up feeling unrefreshed?',
    indicator: 'Sleep disruption is one of the most reliable physiological markers of both anxiety and depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you experience physical symptoms like tension headaches, jaw clenching, neck/back pain, or unexplained stomach issues?',
    indicator: 'Somatization; the body physically holding and manifesting chronic psychological stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you notice you are skipping meals due to stress, or conversely, binge-eating/stress-eating to cope with the workday?',
    indicator: 'Disordered eating patterns triggered by emotional distress or lack of time.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you rely on substances (such as a few glasses of wine, recreational drugs, or excessive sleeping pills) specifically to "numb out" or wind down after work?',
    indicator: 'Maladaptive (unhealthy) coping mechanisms and a risk factor for substance dependency.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Physical Symptoms and Coping Mechanisms',
    text: 'How often do you have passing thoughts of wanting to crash your car to avoid work, wishing you could just disappear, or having thoughts of self-harm?',
    indicator: 'Severe depressive crisis, passive suicidality, or extreme burnout — this requires immediate professional intervention. Please reach out to a healthcare provider or crisis hotline now.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Business Leader questionnaire (full 20 questions) ───────────────────────
const businessLeaderQuestions = [
  // Part 1: Identity, Obsession, and The Facade
  {
    id: 1,
    part: 'Part 1: Identity, Obsession, and The Facade',
    text: 'How often do you feel that your personal worth and identity are entirely dependent on the financial success or public image of your business?',
    indicator: 'Enmeshment. When the boundary between "self" and "business" collapses, a bad quarter feels like a personal failure, severely spiking depression risk.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Identity, Obsession, and The Facade',
    text: 'How often do you feel intense guilt or anxiety when you take time off, rest, or spend time away from the business?',
    indicator: 'Toxic productivity and an inability to psychologically detach from work.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Identity, Obsession, and The Facade',
    text: 'How often do you feel like you have to project a facade of constant success and confidence, hiding your true stress from investors, employees, or your family?',
    indicator: 'Masking and emotional isolation. The pressure to "fake it till you make it" is a massive drain on mental energy.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Identity, Obsession, and The Facade',
    text: 'How often do you feel completely alone in shouldering the burdens of the business, feeling that no one else truly understands the pressure you are under?',
    indicator: 'Executive isolation, a primary driver of depression in business owners.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Identity, Obsession, and The Facade',
    text: 'How often do you realize you no longer have any hobbies, interests, or conversation topics that do not revolve around your business?',
    indicator: 'Life imbalance and loss of outside identity; a classic precursor to severe burnout.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: Executive Function and Decision Fatigue
  {
    id: 6,
    part: 'Part 2: Executive Function and Decision Fatigue',
    text: 'How often do you experience "decision fatigue," where making even a minor choice (like what to eat for lunch or answering a simple email) feels paralyzing?',
    indicator: "Cognitive overload. When the brain's executive functioning is depleted by chronic stress, simple tasks become overwhelmingly difficult.",
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: Executive Function and Decision Fatigue',
    text: 'How often do you find yourself procrastinating on critical, high-stakes tasks because you feel too overwhelmed to face them?',
    indicator: 'Anxiety-driven avoidance behavior, which often compounds business problems and creates a shame spiral.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: Executive Function and Decision Fatigue',
    text: 'How often do you achieve a major business milestone or financial goal, but feel completely numb or immediately move to the next goal without celebrating?',
    indicator: 'Anhedonia (inability to feel pleasure) and shifting goalposts, which strips the brain of necessary dopamine rewards.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: Executive Function and Decision Fatigue',
    text: 'How often do you constantly obsess over worst-case scenarios regarding cash flow, losing key clients, or the business failing entirely?',
    indicator: 'Catastrophizing and financial anxiety; living in a chronic state of "fight or flight."',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: Executive Function and Decision Fatigue',
    text: 'How often do you experience "brain fog," memory slips, or an inability to focus during important meetings or while reviewing documents?',
    indicator: "Neurological impact of prolonged stress; elevated cortisol actively impairs the brain's memory and focus centers.",
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Emotional Regulation and Relationships
  {
    id: 11,
    part: 'Part 3: Emotional Regulation and Relationships',
    text: 'How often do you find yourself feeling deeply cynical, resentful, or unusually impatient with your employees, partners, or clients?',
    indicator: 'Depersonalization; a core component of burnout where the brain creates emotional distance to protect itself from further drain.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Emotional Regulation and Relationships',
    text: 'How often do you snap at your spouse, children, or friends over minor inconveniences because your patience has been entirely used up at work?',
    indicator: 'Emotional dysregulation and "spillover" stress damaging personal support systems.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Emotional Regulation and Relationships',
    text: 'How often do you feel a lingering sense of emptiness or low mood, wondering "Is this all there is?" despite your objective business success?',
    indicator: 'Pervasive low mood and existential distress, strong markers for clinical depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Emotional Regulation and Relationships',
    text: 'How often do you intentionally isolate yourself from your family or friends after a workday because interacting feels like too much effort?',
    indicator: 'Social withdrawal due to extreme emotional exhaustion.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Emotional Regulation and Relationships',
    text: 'How often do you experience sudden episodes of intense physical panic (racing heart, shortness of breath, dizziness) when dealing with business issues?',
    indicator: 'Panic attacks or acute panic disorder triggered by high-stakes environments.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Physical Health and Coping Mechanisms
  {
    id: 16,
    part: 'Part 4: Physical Health and Coping Mechanisms',
    text: 'How often do you lie awake at night, unable to sleep because your brain will not stop looping through business problems or to-do lists?',
    indicator: 'Sleep-onset insomnia driven by hyperarousal; lack of sleep aggressively accelerates mental health decline.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Physical Health and Coping Mechanisms',
    text: 'How often do you ignore your basic physical needs (skipping meals, sitting at a desk for 10 hours straight, ignoring medical checkups) for the sake of the business?',
    indicator: 'Self-neglect, prioritizing the "machine" over the human running it.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Physical Health and Coping Mechanisms',
    text: 'How often do you experience physical symptoms like chronic back/neck pain, tension headaches, or unexplained gastrointestinal issues?',
    indicator: 'Somatization; the body physically manifesting the stress that the mind is trying to suppress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Physical Health and Coping Mechanisms',
    text: 'How often do you rely on substances (alcohol, sleeping pills, excessive caffeine, or other drugs) specifically to wind down, cope with the pressure, or force yourself to sleep?',
    indicator: 'Maladaptive coping mechanisms and risk of substance dependency (a statistically high risk for founders).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Physical Health and Coping Mechanisms',
    text: 'How often do you have passing thoughts that getting into an accident, being hospitalized, or not waking up would be a welcome relief from the pressure of running the business?',
    indicator: 'Passive suicidality or severe depressive crisis — this requires immediate professional intervention. Please reach out to a healthcare provider or crisis hotline now.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Single Mother questionnaire (full 20 questions) ─────────────────────────
const singleMotherQuestions = [
  // Part 1: Burnout and Cognitive Load
  {
    id: 1,
    part: 'Part 1: Burnout and Cognitive Load',
    text: 'How often do you wake up already feeling physically and emotionally exhausted, dreading the demands of the day?',
    indicator: 'Morning dread and chronic fatigue are primary signs of parental burnout and depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Burnout and Cognitive Load',
    text: 'How often do you feel a sense of "decision fatigue," where having to make one more choice (even what to make for dinner) feels completely paralyzing?',
    indicator: "Cognitive overload. Solo parenting requires making 100% of the household decisions, which heavily depletes the brain's executive functioning.",
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Burnout and Cognitive Load',
    text: 'How often do you completely sacrifice your basic physiological needs (skipping meals, delaying using the restroom, losing sleep) just to keep the household running?',
    indicator: 'Severe self-neglect and the collapse of personal boundaries.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Burnout and Cognitive Load',
    text: 'How often do you feel like you are just surviving on "autopilot," going through the motions without actually enjoying your daily life?',
    indicator: "Dissociation and emotional blunting; the brain's defense mechanism against chronic, inescapable stress.",
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Burnout and Cognitive Load',
    text: 'How often do you lie awake at night, unable to sleep because your brain is looping through a never-ending to-do list or financial worries?',
    indicator: 'Hyperarousal and sleep-onset insomnia driven by the anxiety of carrying the mental load alone.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: "Mom Guilt" and Parenting Stress
  {
    id: 6,
    part: 'Part 2: "Mom Guilt" and Parenting Stress',
    text: 'How often do you feel intense guilt that you are not doing enough, providing enough, or being "present" enough for your children?',
    indicator: 'Toxic "mom guilt" and perfectionism, which aggressively degrades self-worth.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: "Mom Guilt" and Parenting Stress',
    text: 'How often do you worry that your children are negatively impacted or missing out because they are in a single-parent household?',
    indicator: 'Internalized stigma and anxiety regarding family structure.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: "Mom Guilt" and Parenting Stress',
    text: 'How often do you find yourself snapping, yelling, or losing your temper with your children over minor things, followed by immediate guilt?',
    indicator: 'Emotional dysregulation; depression and severe stress frequently manifest as a shortened temper and irritability.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: "Mom Guilt" and Parenting Stress',
    text: 'How often do you feel resentment toward the relentless demands of motherhood, followed by shame for feeling that way?',
    indicator: 'Parental burnout. It is a normal psychological response to unrelenting demands, but the accompanying shame causes deep emotional distress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: "Mom Guilt" and Parenting Stress',
    text: 'How often do you compare yourself to two-parent households or other mothers on social media and feel like you are completely failing?',
    indicator: 'The "comparison trap," which fuels feelings of inadequacy and low self-esteem.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Isolation and Emotional Well-Being
  {
    id: 11,
    part: 'Part 3: Isolation and Emotional Well-Being',
    text: 'How often do you feel completely alone, feeling that if a true emergency happened, you have no "village" or backup to rely on?',
    indicator: 'Lack of a secure support system and profound emotional isolation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Isolation and Emotional Well-Being',
    text: 'How often do you feel a lingering sense of sadness, emptiness, or find yourself crying in the shower or car where your kids cannot see you?',
    indicator: 'Pervasive low mood and masking (hiding depression to protect children).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Isolation and Emotional Well-Being',
    text: 'How often do you feel like you have entirely lost your identity outside of being a mother and a provider?',
    indicator: 'Enmeshment and identity loss; a classic precursor to depressive episodes in caregivers.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Isolation and Emotional Well-Being',
    text: 'How often do you feel that you have to project a facade of being a "strong, independent single mom" while secretly feeling like you are falling apart?',
    indicator: 'Emotional suppression. The pressure to appear resilient prevents seeking help and increases internal distress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Isolation and Emotional Well-Being',
    text: 'How often do you experience physical symptoms like tension headaches, a tight chest, or unexplained stomach issues when thinking about your responsibilities?',
    indicator: 'Somatization; the body physically manifesting the chronic psychological stress of solo parenting.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Financial Anxiety and Coping Mechanisms
  {
    id: 16,
    part: 'Part 4: Financial Anxiety and Coping Mechanisms',
    text: 'How often does anxiety about money, bills, or providing for your children\'s future cause you physical panic (racing heart, shortness of breath)?',
    indicator: 'Acute financial anxiety and hyper-vigilance regarding survival and security.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Financial Anxiety and Coping Mechanisms',
    text: 'How often do you avoid looking at your bank account, opening mail, or dealing with ex-partner issues because the anxiety is too overwhelming?',
    indicator: 'Anxiety-driven avoidance behavior, which often compounds stress over time.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Financial Anxiety and Coping Mechanisms',
    text: 'How often do you feel completely drained of the energy required to maintain friendships or date, choosing isolation instead?',
    indicator: 'Social withdrawal due to extreme emotional and physical exhaustion.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Financial Anxiety and Coping Mechanisms',
    text: 'How often do you rely on substances (like a few glasses of wine every night) or behavioral escapes (like endless doomscrolling) to numb out and cope with the evening silence?',
    indicator: 'Maladaptive (unhealthy) coping mechanisms and a risk factor for substance dependency to manage solo-parenting stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Financial Anxiety and Coping Mechanisms',
    text: 'How often do you have passing thoughts that your family would be better off without you, or wish you could get sick or injured just so you could finally rest?',
    indicator: 'Passive suicidality, severe depressive crisis, or extreme burnout — this requires immediate professional intervention. You and your children deserve for you to be healthy and safe.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Single Father questionnaire (full 20 questions) ─────────────────────────
const singleFatherQuestions = [
  // Part 1: Burnout and The "Provider/Protector" Burden
  {
    id: 1,
    part: 'Part 1: Burnout and The "Provider/Protector" Burden',
    text: 'How often do you wake up feeling physically and mentally drained, wondering how you are going to get through the day\'s responsibilities?',
    indicator: 'Morning dread and chronic fatigue are primary physiological signs of parental burnout and depression.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 2,
    part: 'Part 1: Burnout and The "Provider/Protector" Burden',
    text: 'How often do you feel a crushing anxiety about balancing the need to provide financially with the need to be physically and emotionally present for your kids?',
    indicator: 'Work-life conflict and the intense pressure of being the sole financial and emotional pillar of the house.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 3,
    part: 'Part 1: Burnout and The "Provider/Protector" Burden',
    text: 'How often do you feel like you are just going through the motions on "autopilot," getting tasks done but feeling emotionally numb?',
    indicator: "Dissociation and emotional blunting; the brain's defense mechanism against chronic, inescapable stress.",
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 4,
    part: 'Part 1: Burnout and The "Provider/Protector" Burden',
    text: 'How often do you sacrifice your own basic needs (like sleep, exercise, or eating a proper meal) just to make sure work and the kids are taken care of?',
    indicator: 'Severe self-neglect and the collapse of personal boundaries.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 5,
    part: 'Part 1: Burnout and The "Provider/Protector" Burden',
    text: 'How often do you lie awake at night, unable to sleep because your mind is racing with financial worries or everything you have to do the next day?',
    indicator: 'Hyperarousal and sleep-onset insomnia driven by the anxiety of carrying the mental load entirely alone.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 2: "Dad Guilt" and Emotional Regulation
  {
    id: 6,
    part: 'Part 2: "Dad Guilt" and Emotional Regulation',
    text: 'How often do you feel intense guilt that you cannot be both the "mom and the dad," worrying that your kids are missing out because of your family structure?',
    indicator: '"Dad guilt" and internalized anxiety regarding family dynamics and feelings of inadequacy.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 7,
    part: 'Part 2: "Dad Guilt" and Emotional Regulation',
    text: 'How often do you find yourself snapping, yelling, or losing your temper with your children over minor things, followed immediately by heavy guilt?',
    indicator: 'Emotional dysregulation. In men, depression and severe stress frequently manifest as a shortened temper, frustration, and irritability rather than sadness.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 8,
    part: 'Part 2: "Dad Guilt" and Emotional Regulation',
    text: 'How often do you feel you have to be the "rock" for your family, aggressively hiding your own fears, sadness, or stress so your kids don\'t see you struggle?',
    indicator: 'Emotional suppression. The pressure to appear invincible prevents men from processing their own emotional distress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 9,
    part: 'Part 2: "Dad Guilt" and Emotional Regulation',
    text: 'How often do you feel a sudden wave of resentment toward the relentless, repetitive demands of solo parenting, followed by shame for feeling that way?',
    indicator: 'Parental burnout. Resentment is a normal psychological response to unrelenting demands, but the accompanying shame causes deep internal conflict.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 10,
    part: 'Part 2: "Dad Guilt" and Emotional Regulation',
    text: 'How often do you feel judged or scrutinized by society (teachers, doctors, other parents) regarding your capabilities as a solo male caregiver?',
    indicator: 'Stereotype stress and the anxiety of feeling out of place or untrusted in traditionally female-dominated parenting spaces.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 3: Isolation and Identity
  {
    id: 11,
    part: 'Part 3: Isolation and Identity',
    text: 'How often do you feel completely isolated, feeling like you have no "village," no backup, and no other single dads to talk to who actually understand?',
    indicator: 'Lack of a secure support system and profound social/emotional isolation.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 12,
    part: 'Part 3: Isolation and Identity',
    text: 'When you feel overwhelmed or scared, how often do you feel like there is absolutely no one you can safely open up to without looking weak or like a failure?',
    indicator: 'Vulnerability block. Toxic masculinity norms often leave men feeling they cannot ask for emotional help.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 13,
    part: 'Part 3: Isolation and Identity',
    text: 'How often do you realize you have entirely lost your identity, having no hobbies, interests, or life outside of being a worker and a father?',
    indicator: 'Identity loss and enmeshment; a classic precursor to depressive episodes in sole caregivers.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 14,
    part: 'Part 3: Isolation and Identity',
    text: 'How often do you feel completely drained of the energy required to maintain friendships, date, or be social, choosing isolation instead?',
    indicator: 'Social withdrawal due to extreme emotional and physical exhaustion.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 15,
    part: 'Part 3: Isolation and Identity',
    text: 'How often do you experience physical symptoms like chronic back/neck pain, tension headaches, or unexplained stomach issues when stressed?',
    indicator: 'Somatization; the body physically manifesting the chronic psychological stress that you are trying to suppress mentally.',
    reversed: false,
    safetyQuestion: false,
  },

  // Part 4: Coping Mechanisms and Crisis Indicators
  {
    id: 16,
    part: 'Part 4: Coping Mechanisms and Crisis Indicators',
    text: 'How often does anxiety about money, custody dynamics, or your children\'s future cause physical panic (racing heart, shortness of breath, tight chest)?',
    indicator: 'Acute anxiety and hyper-vigilance regarding survival and family security.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 17,
    part: 'Part 4: Coping Mechanisms and Crisis Indicators',
    text: 'How often do you avoid dealing with stressors — like not opening bills, ignoring emails, or avoiding interactions with your ex-partner — because the anxiety is too high?',
    indicator: 'Anxiety-driven avoidance behavior, which often compounds stress over time.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 18,
    part: 'Part 4: Coping Mechanisms and Crisis Indicators',
    text: 'How often do you bury yourself in work or over-schedule yourself specifically so you don\'t have to stop and think about your emotional state?',
    indicator: 'Overworking as an avoidance coping mechanism (highly common in men).',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 19,
    part: 'Part 4: Coping Mechanisms and Crisis Indicators',
    text: 'How often do you rely on substances (like alcohol, excessive smoking) or behavioral escapes (like endless scrolling, gaming, gambling) to numb out once the kids finally go to sleep?',
    indicator: 'Maladaptive (unhealthy) coping mechanisms and a high risk factor for substance dependency to manage solo-parenting stress.',
    reversed: false,
    safetyQuestion: false,
  },
  {
    id: 20,
    part: 'Part 4: Coping Mechanisms and Crisis Indicators',
    text: 'How often do you have passing thoughts that your family would be better off without you, or wish you could get injured or just disappear so you could finally rest?',
    indicator: 'Passive suicidality, severe depressive crisis, or extreme burnout — this requires immediate professional intervention. Your children need you here, and they need you healthy.',
    reversed: false,
    safetyQuestion: true,
  },
]

// ─── Counselling for 10th — career aptitude (10 questions) ───────────────────
const counselling10thQuestions = [
  { id:1,  part:'Part 1: Technical & Creative Interests', text:'How often do you enjoy taking things apart, building projects, or fixing devices with your hands?', indicator:'Mechanical aptitude and hands-on problem-solving — suited for engineering or technology.', reversed:false, safetyQuestion:false },
  { id:2,  part:'Part 1: Technical & Creative Interests', text:'How often do you spend your free time sketching, writing, making music, or creating content?', indicator:'Creative and language arts inclination — suited for design, media, or communication.', reversed:false, safetyQuestion:false },
  { id:3,  part:'Part 2: Academic Strengths', text:'How often do you enjoy solving maths puzzles, logic problems, or coding challenges?', indicator:'Analytical and mathematical aptitude — suited for engineering, technology, or finance.', reversed:false, safetyQuestion:false },
  { id:4,  part:'Part 2: Academic Strengths', text:'How often do you enjoy science subjects (biology, chemistry, physics) and asking why things work?', indicator:'Scientific curiosity and STEM inclination — suited for medicine, research, or engineering.', reversed:false, safetyQuestion:false },
  { id:5,  part:'Part 3: People & Leadership Skills', text:'How often do your classmates come to you for advice or emotional support?', indicator:'Empathy and interpersonal aptitude — suited for psychology, counselling, or social work.', reversed:false, safetyQuestion:false },
  { id:6,  part:'Part 3: People & Leadership Skills', text:'How often do you naturally take charge, organise group projects, or step up as a leader?', indicator:'Leadership and organisational aptitude — suited for management or administration.', reversed:false, safetyQuestion:false },
  { id:7,  part:'Part 4: Business & Career Interests', text:'How often do you think about starting a business, earning money independently, or selling something?', indicator:'Entrepreneurial spirit and commercial awareness — suited for business or entrepreneurship.', reversed:false, safetyQuestion:false },
  { id:8,  part:'Part 4: Business & Career Interests', text:'How often do you enjoy helping or explaining things to younger students?', indicator:'Teaching and mentorship aptitude — suited for education careers.', reversed:false, safetyQuestion:false },
  { id:9,  part:'Part 5: Career Clarity', text:'How often do you feel confident and clear about the career field or stream you want after 10th?', indicator:'Career readiness; low confidence here suggests a need for structured career counselling.', reversed:true, safetyQuestion:false },
  { id:10, part:'Part 5: Career Clarity', text:'How often do you actively research career options, college pathways, or talk to a mentor about your future?', indicator:'Proactive career exploration; low engagement suggests guidance is needed.', reversed:true, safetyQuestion:false },
  // Part 1 continued
  { id:11, part:'Part 1: Technical & Creative Interests', text:'How often do you enjoy experimenting with cooking, gardening, or working with natural materials?', indicator:'Nature and craft aptitude — suited for agriculture, food science, or environmental careers.', reversed:false, safetyQuestion:false },
  { id:12, part:'Part 1: Technical & Creative Interests', text:'How often do you spend time reading books, writing stories, or exploring new languages?', indicator:'Language and literary aptitude — suited for journalism, law, or communication.', reversed:false, safetyQuestion:false },
  { id:13, part:'Part 1: Technical & Creative Interests', text:'How often do you enjoy playing a musical instrument, dancing, or performing on stage?', indicator:'Performing arts aptitude — suited for music, theatre, or entertainment industry.', reversed:false, safetyQuestion:false },
  { id:14, part:'Part 1: Technical & Creative Interests', text:'How often do you explore apps, software, or digital tools beyond just using them for entertainment?', indicator:'Digital curiosity and tech-savviness — suited for IT, app development, or digital media.', reversed:false, safetyQuestion:false },
  { id:15, part:'Part 1: Technical & Creative Interests', text:'How often do you feel excited and satisfied when you find a clever solution to a tricky problem?', indicator:'Problem-solving orientation — critical for engineering, research, and analytical careers.', reversed:false, safetyQuestion:false },
  // Part 2 continued
  { id:16, part:'Part 2: Academic Strengths', text:'How often do you enjoy studying animals, plants, the environment, or natural science topics?', indicator:'Life science interest — suited for biology, ecology, veterinary, or environmental careers.', reversed:false, safetyQuestion:false },
  { id:17, part:'Part 2: Academic Strengths', text:'How often do you find it easy to remember facts, dates, and historical events?', indicator:'Memory and history aptitude — suited for humanities, law, or civil services.', reversed:false, safetyQuestion:false },
  { id:18, part:'Part 2: Academic Strengths', text:'How often do you enjoy reading maps, learning about different cultures, or exploring geography?', indicator:'Spatial and cultural aptitude — suited for geography, tourism, or foreign services.', reversed:false, safetyQuestion:false },
  { id:19, part:'Part 2: Academic Strengths', text:'How often do you find it easier to learn by watching demonstrations rather than reading textbooks?', indicator:'Kinesthetic/visual learning style — suited for vocational, design, or hands-on careers.', reversed:false, safetyQuestion:false },
  { id:20, part:'Part 2: Academic Strengths', text:'How often do you enjoy working with numbers, calculating budgets, or tracking expenses in daily life?', indicator:'Numerical aptitude — suited for accountancy, finance, or data analytics.', reversed:false, safetyQuestion:false },
  // Part 3 continued
  { id:21, part:'Part 3: People & Leadership Skills', text:'How often do you enjoy organising events, planning outings, or coordinating a group activity?', indicator:'Event planning and coordination aptitude — suited for management, HR, or event industries.', reversed:false, safetyQuestion:false },
  { id:22, part:'Part 3: People & Leadership Skills', text:'How often do you feel comfortable speaking in front of a group, giving speeches, or debating?', indicator:'Public speaking and communication aptitude — suited for law, politics, or media.', reversed:false, safetyQuestion:false },
  { id:23, part:'Part 3: People & Leadership Skills', text:'How often do you listen patiently when someone shares a problem without immediately giving advice?', indicator:'Empathetic listening — core trait for psychology, counselling, social work, or nursing.', reversed:false, safetyQuestion:false },
  { id:24, part:'Part 3: People & Leadership Skills', text:'How often do you successfully persuade or negotiate to change someone\'s opinion or decision?', indicator:'Persuasion and negotiation aptitude — suited for sales, marketing, law, or diplomacy.', reversed:false, safetyQuestion:false },
  { id:25, part:'Part 3: People & Leadership Skills', text:'How often do you enjoy meeting new people and initiating conversations with strangers?', indicator:'Social confidence and networking aptitude — suited for business, hospitality, or PR roles.', reversed:false, safetyQuestion:false },
  // Part 4 continued
  { id:26, part:'Part 4: Business & Career Interests', text:'How often do you notice prices, discounts, or think about how products or businesses make money?', indicator:'Commercial awareness — core trait for business, economics, or entrepreneurship.', reversed:false, safetyQuestion:false },
  { id:27, part:'Part 4: Business & Career Interests', text:'How often do you feel drawn to caring for sick people, first aid, or health-related topics?', indicator:'Healthcare empathy — essential for medicine, nursing, or pharmacy careers.', reversed:false, safetyQuestion:false },
  { id:28, part:'Part 4: Business & Career Interests', text:'How often do you feel excited about jobs that involve travel, field work, or outdoor exploration?', indicator:'Outdoor and travel aptitude — suited for geography, archaeology, or environmental science.', reversed:false, safetyQuestion:false },
  { id:29, part:'Part 4: Business & Career Interests', text:'How often do you feel interested in law, justice, how courts work, or how society is governed?', indicator:'Legal and civic aptitude — suited for law, civil services, or political science.', reversed:false, safetyQuestion:false },
  { id:30, part:'Part 4: Business & Career Interests', text:'How often do you imagine creating something — a product, app, or idea — that many people would use?', indicator:'Innovation and impact-driven motivation — core for entrepreneurship or product development.', reversed:false, safetyQuestion:false },
  // Part 5 continued
  { id:31, part:'Part 5: Career Clarity', text:'How often do you discuss possible careers with family members or professionals in different fields?', indicator:'Career exploration through networking — proactive students are better prepared for choices.', reversed:true, safetyQuestion:false },
  { id:32, part:'Part 5: Career Clarity', text:'How often do you feel that a hobby or passion of yours could actually become a career?', indicator:'Passion-to-career alignment — high alignment suggests stronger intrinsic career motivation.', reversed:true, safetyQuestion:false },
  { id:33, part:'Part 5: Career Clarity', text:'How often do you think about the lifestyle, salary, and work environment your future career should provide?', indicator:'Career values clarity — essential for long-term career satisfaction and direction.', reversed:true, safetyQuestion:false },
  { id:34, part:'Part 5: Career Clarity', text:'How often do you feel confused or anxious about which stream — Science, Commerce, or Arts — to choose?', indicator:'Stream-selection anxiety — a core counselling focus at the 10th standard transition.', reversed:false, safetyQuestion:false },
  { id:35, part:'Part 5: Career Clarity', text:'How often do you feel genuinely satisfied and proud when you complete a project in a subject you love?', indicator:'Intrinsic academic satisfaction — a reliable signal of career-field alignment.', reversed:true, safetyQuestion:false },
  // Part 6: Work Style
  { id:36, part:'Part 6: Work Style & Environment', text:'How often do you prefer working alone on a task rather than collaborating in a group?', indicator:'Independent work preference — suited for research, writing, or technical specialist roles.', reversed:false, safetyQuestion:false },
  { id:37, part:'Part 6: Work Style & Environment', text:'How often do you like following clear rules and step-by-step procedures when completing a task?', indicator:'Structured work preference — suited for accounting, law, medicine, or quality control.', reversed:false, safetyQuestion:false },
  { id:38, part:'Part 6: Work Style & Environment', text:'How often do you feel energised and happy after helping someone understand a difficult concept?', indicator:'Teaching and mentoring drive — a defining trait for education, training, or coaching careers.', reversed:false, safetyQuestion:false },
  { id:39, part:'Part 6: Work Style & Environment', text:'How often do you prefer physical, outdoor, or hands-on tasks over sitting at a desk and studying?', indicator:'Kinesthetic and outdoor work preference — suited for sports, agriculture, or field-based careers.', reversed:false, safetyQuestion:false },
  { id:40, part:'Part 6: Work Style & Environment', text:'How often do you feel more creative and productive in the evenings compared to mornings?', indicator:'Chronotype and self-awareness — helps students plan study and career environments better.', reversed:false, safetyQuestion:false },
  // Part 7: Social Awareness & Values
  { id:41, part:'Part 7: Values & Social Awareness', text:'How often do you feel a strong desire to help communities, drive social change, or support underprivileged people?', indicator:'Social impact motivation — core for social work, NGO, public health, or policy careers.', reversed:false, safetyQuestion:false },
  { id:42, part:'Part 7: Values & Social Awareness', text:'How often do you care deeply about environmental protection, sustainability, or climate-related issues?', indicator:'Environmental values — suited for environmental science, ecology, or green energy careers.', reversed:false, safetyQuestion:false },
  { id:43, part:'Part 7: Values & Social Awareness', text:'How often do you feel more motivated by making a meaningful difference than by earning a very high salary?', indicator:'Altruistic vs financial motivation — helps clarify career values and sector preferences.', reversed:false, safetyQuestion:false },
  { id:44, part:'Part 7: Values & Social Awareness', text:'How often do you feel comfortable with uncertainty, experimenting with new ideas, or trying unconventional approaches?', indicator:'Risk tolerance and innovation mindset — essential for entrepreneurship, research, or creative fields.', reversed:false, safetyQuestion:false },
  { id:45, part:'Part 7: Values & Social Awareness', text:'How often do you search for scholarships, government schemes, or educational programmes beyond your school syllabus?', indicator:'Proactive information-seeking — a strong indicator of career awareness and ambition.', reversed:true, safetyQuestion:false },
  // Part 8: Self-Awareness
  { id:46, part:'Part 8: Self-Awareness & Growth', text:'How often do you reflect on your own strengths and weaknesses after completing a task or exam?', indicator:'Self-reflective capacity — a key trait for career planning and personal development.', reversed:true, safetyQuestion:false },
  { id:47, part:'Part 8: Self-Awareness & Growth', text:'How often do you feel proud of your work even when others do not notice or praise it?', indicator:'Intrinsic self-worth — students with high intrinsic motivation are more resilient in career challenges.', reversed:true, safetyQuestion:false },
  { id:48, part:'Part 8: Self-Awareness & Growth', text:'How often do you set personal goals for the week, month, or year and track your progress?', indicator:'Goal-setting discipline — a foundational habit for career success in any field.', reversed:true, safetyQuestion:false },
  { id:49, part:'Part 8: Self-Awareness & Growth', text:'How often do you feel ready to change direction or try something completely different if your current path feels wrong?', indicator:'Adaptability and growth mindset — essential for navigating a rapidly changing career landscape.', reversed:true, safetyQuestion:false },
  { id:50, part:'Part 8: Self-Awareness & Growth', text:'How often do you feel genuinely excited and curious when learning something completely new, even if it is difficult?', indicator:'Love of learning — one of the strongest predictors of long-term career engagement and success.', reversed:true, safetyQuestion:false },
]

// ─── Counselling for 12th — career direction (50 questions) ──────────────────
const counselling12thQuestions = [
  { id:1,  part:'Part 1: Stream & Subject Clarity', text:'How often do you feel the stream you chose (Science / Commerce / Arts) truly matches your interests?', indicator:'Alignment between chosen stream and personal aptitude; misalignment suggests re-evaluation.', reversed:true, safetyQuestion:false },
  { id:2,  part:'Part 1: Stream & Subject Clarity', text:'How often do you feel overwhelmed by the pressure of board exams, entrance tests, and career decisions?', indicator:'Academic stress and career-related anxiety — a primary counselling focus for 12th students.', reversed:false, safetyQuestion:false },
  { id:3,  part:'Part 2: College & Career Planning', text:'How often do you actively research colleges, entrance exams (JEE/NEET/CUET), or degree programmes?', indicator:'Proactive college planning; low engagement signals need for structured career guidance.', reversed:true, safetyQuestion:false },
  { id:4,  part:'Part 2: College & Career Planning', text:"How often do you feel your parents' career expectations align with what YOU actually want to do?", indicator:"Family-student expectation alignment; frequent mismatch is a major source of stress.", reversed:true, safetyQuestion:false },
  { id:5,  part:'Part 2: College & Career Planning', text:'How often do you feel confused or indecisive about which college, course, or career to choose?', indicator:'Decision-making clarity; high confusion signals the need for structured career counselling.', reversed:false, safetyQuestion:false },
  { id:6,  part:'Part 3: Personal Development', text:'How often do you develop skills outside school (coding, public speaking, sports, art, etc.)?', indicator:'Self-driven skill development beyond academics — important for holistic career readiness.', reversed:true, safetyQuestion:false },
  { id:7,  part:'Part 3: Personal Development', text:'How often do you feel genuinely excited and motivated when imagining yourself in your future career?', indicator:'Intrinsic career motivation; low excitement may indicate a poor career-interest fit.', reversed:true, safetyQuestion:false },
  { id:8,  part:'Part 4: Support & Guidance', text:'How often do you discuss your career goals with a teacher, counsellor, or mentor for structured guidance?', indicator:'Access to career guidance; low engagement suggests the student needs more support.', reversed:true, safetyQuestion:false },
  { id:9,  part:'Part 4: Support & Guidance', text:'How often do you compare yourself to peers and feel unprepared or behind in career planning?', indicator:'Peer comparison and career-related self-esteem issues; frequent comparison signals anxiety.', reversed:false, safetyQuestion:false },
  { id:10, part:'Part 5: Goal Setting', text:'How often do you feel you have a clear 2-3 year plan for your education and career after 12th?', indicator:'Short-term goal clarity; low clarity is the primary indicator for career counselling need.', reversed:true, safetyQuestion:false },
  // Part 1 continued
  { id:11, part:'Part 1: Stream & Subject Clarity', text:'How often do you enjoy studying your current stream subjects and feel they connect to your career goals?', indicator:'Subject-career alignment; disconnection signals the student may need stream or career re-evaluation.', reversed:true, safetyQuestion:false },
  { id:12, part:'Part 1: Stream & Subject Clarity', text:'How often do you wish you had chosen a different stream after seeing what your friends are studying?', indicator:'Stream regret — a critical counselling indicator; high frequency suggests stream mismatch.', reversed:false, safetyQuestion:false },
  { id:13, part:'Part 1: Stream & Subject Clarity', text:'How often do you feel confident answering questions and performing well in your current stream subjects?', indicator:'Academic self-efficacy in current stream — low confidence signals misalignment or learning gaps.', reversed:true, safetyQuestion:false },
  { id:14, part:'Part 1: Stream & Subject Clarity', text:'How often do you feel your board exam preparation is well-organised and on track?', indicator:'Academic preparedness and time management — key for board and entrance exam performance.', reversed:true, safetyQuestion:false },
  { id:15, part:'Part 1: Stream & Subject Clarity', text:'How often do you explore subjects outside your stream out of genuine curiosity and interest?', indicator:'Cross-disciplinary curiosity — may signal broader career interests beyond the current stream.', reversed:true, safetyQuestion:false },
  // Part 2 continued
  { id:16, part:'Part 2: College & Career Planning', text:'How often do you discuss your career options openly with your parents, teachers, or mentors?', indicator:'Access to guidance network; open communication signals better-supported career decision-making.', reversed:true, safetyQuestion:false },
  { id:17, part:'Part 2: College & Career Planning', text:'How often do you attend career guidance sessions, webinars, or seminars for students?', indicator:'Active career information-seeking — proactive students have better career clarity outcomes.', reversed:true, safetyQuestion:false },
  { id:18, part:'Part 2: College & Career Planning', text:'How often do you look for scholarships, grants, or financial aid for your higher education?', indicator:'Financial planning and information-seeking — important for students from all economic backgrounds.', reversed:true, safetyQuestion:false },
  { id:19, part:'Part 2: College & Career Planning', text:'How often do you visit college websites, attend open days, or talk to seniors about their college experiences?', indicator:'Active college exploration — a strong predictor of informed and confident college selection.', reversed:true, safetyQuestion:false },
  { id:20, part:'Part 2: College & Career Planning', text:'How often do you feel your preparation aligns with what the entrance exam or selection process requires?', indicator:'Preparation-goal alignment — gaps here highlight where structured coaching or guidance is needed.', reversed:true, safetyQuestion:false },
  // Part 3 continued
  { id:21, part:'Part 3: Personal Development', text:'How often do you participate in competitions, olympiads, hackathons, or skill-based challenges?', indicator:'Competitive engagement and ambition — signals readiness for highly competitive career paths.', reversed:true, safetyQuestion:false },
  { id:22, part:'Part 3: Personal Development', text:'How often do you seek feedback on your work from teachers, seniors, or mentors and act on it?', indicator:'Feedback receptiveness — a foundational trait for growth and professional career development.', reversed:true, safetyQuestion:false },
  { id:23, part:'Part 3: Personal Development', text:'How often do you manage your own study schedule and deadlines without needing external pressure?', indicator:'Self-regulation and academic autonomy — essential for college and professional success.', reversed:true, safetyQuestion:false },
  { id:24, part:'Part 3: Personal Development', text:'How often do you read about career paths, professional biographies, or inspirational stories of successful people?', indicator:'Career inspiration-seeking — students who read about careers tend to have more informed aspirations.', reversed:true, safetyQuestion:false },
  { id:25, part:'Part 3: Personal Development', text:'How often do you feel that you are growing — both as a student and as a person — compared to a year ago?', indicator:'Personal growth awareness — a key indicator of psychological readiness for career and college transitions.', reversed:true, safetyQuestion:false },
  // Part 4: Stress & Support
  { id:26, part:'Part 4: Stress, Pressure & Support', text:'How often do you feel physically tired, unable to sleep properly, or get headaches due to exam or career pressure?', indicator:'Physical stress symptoms — severe or frequent symptoms require wellness intervention alongside career counselling.', reversed:false, safetyQuestion:false },
  { id:27, part:'Part 4: Stress, Pressure & Support', text:'How often do you feel your school or coaching centre provides enough emotional and academic support?', indicator:'Institutional support perception — low support signals a need for external counselling resources.', reversed:true, safetyQuestion:false },
  { id:28, part:'Part 4: Stress, Pressure & Support', text:'How often do you talk to a trusted person (friend, parent, counsellor) when you feel anxious or overwhelmed?', indicator:'Help-seeking behaviour — low engagement suggests the student may be struggling in silence.', reversed:true, safetyQuestion:false },
  { id:29, part:'Part 4: Stress, Pressure & Support', text:'How often do you take breaks to pursue hobbies or relax without feeling guilty about not studying?', indicator:'Work-rest balance — inability to rest signals unsustainable academic pressure and burnout risk.', reversed:true, safetyQuestion:false },
  { id:30, part:'Part 4: Stress, Pressure & Support', text:'How often do you feel isolated, misunderstood, or alone because of the pressures around career and studies?', indicator:'Social isolation under career pressure — a high-risk signal requiring counsellor intervention.', reversed:false, safetyQuestion:false },
  // Part 5 continued
  { id:31, part:'Part 5: Goal Setting', text:'How often do you write down your career goals, study plans, or personal milestones to track your progress?', indicator:'Goal documentation and tracking — students who write goals achieve them more consistently.', reversed:true, safetyQuestion:false },
  { id:32, part:'Part 5: Goal Setting', text:'How often do you review and adjust your goals when your circumstances or interests change?', indicator:'Adaptive goal management — flexibility is a strong predictor of resilience and long-term success.', reversed:true, safetyQuestion:false },
  { id:33, part:'Part 5: Goal Setting', text:'How often do you feel your career goal is driven by your own passion rather than family or peer pressure?', indicator:'Intrinsic vs extrinsic career motivation — intrinsic motivation strongly predicts long-term career satisfaction.', reversed:true, safetyQuestion:false },
  { id:34, part:'Part 5: Goal Setting', text:'How often do you visualise yourself succeeding in your chosen career and feel genuinely excited about it?', indicator:'Career vision and positive anticipation — strong visualisation correlates with motivated goal pursuit.', reversed:true, safetyQuestion:false },
  { id:35, part:'Part 5: Goal Setting', text:'How often do you research the realistic daily life, salary range, and challenges of your chosen career?', indicator:'Career realism — students who research practical career realities make better-informed decisions.', reversed:true, safetyQuestion:false },
  // Part 6: Decision-Making
  { id:36, part:'Part 6: Decision-Making & Adaptability', text:'How often do you make important decisions confidently without constantly second-guessing yourself?', indicator:'Decision confidence — low confidence under career pressure suggests a need for structured career coaching.', reversed:true, safetyQuestion:false },
  { id:37, part:'Part 6: Decision-Making & Adaptability', text:'How often do you feel okay with the idea of a backup plan if your first-choice college or course does not work out?', indicator:'Backup planning and resilience — students without backup plans experience more crisis under setbacks.', reversed:true, safetyQuestion:false },
  { id:38, part:'Part 6: Decision-Making & Adaptability', text:'How often do you feel capable of adapting to unexpected changes or challenges in your career or study plans?', indicator:'Adaptability — a critical 21st-century career skill; low adaptability predicts difficulty with transitions.', reversed:true, safetyQuestion:false },
  { id:39, part:'Part 6: Decision-Making & Adaptability', text:'How often do you gather enough information and talk to people before making a major career or college decision?', indicator:'Information-gathering before decisions — students who research make more satisfied long-term choices.', reversed:true, safetyQuestion:false },
  { id:40, part:'Part 6: Decision-Making & Adaptability', text:"How often do you feel able to distinguish between your own career aspirations and those others project onto you?", indicator:'Self-differentiation in career choices — confusion here signals high susceptibility to external pressure.', reversed:true, safetyQuestion:false },
  // Part 7: Career Values
  { id:41, part:'Part 7: Career Values & Work Preferences', text:'How often do you feel drawn to careers that have meaningful social impact, even if they pay less?', indicator:'Social impact motivation vs financial motivation — clarifies values-based career fit.', reversed:false, safetyQuestion:false },
  { id:42, part:'Part 7: Career Values & Work Preferences', text:'How often do you prefer structured, predictable work environments over fast-paced, uncertain ones?', indicator:'Work environment preference — helps match students to organisational cultures that suit their personality.', reversed:false, safetyQuestion:false },
  { id:43, part:'Part 7: Career Values & Work Preferences', text:'How often do you feel excited about careers that require constant learning, innovation, or cutting-edge research?', indicator:'Learning-drive and intellectual curiosity — strong predictor of satisfaction in research or tech careers.', reversed:false, safetyQuestion:false },
  { id:44, part:'Part 7: Career Values & Work Preferences', text:'How often do you seriously consider the location, travel requirements, and work-life balance a career offers?', indicator:'Lifestyle-career alignment — students who consider lifestyle factors make more sustained career choices.', reversed:false, safetyQuestion:false },
  { id:45, part:'Part 7: Career Values & Work Preferences', text:'How often do you feel driven to reach the very top of your field and be widely recognised as an expert?', indicator:'Ambition and mastery orientation — high achievers in competitive fields show this trait early.', reversed:false, safetyQuestion:false },
  // Part 8: Emotional Readiness
  { id:46, part:'Part 8: Emotional Readiness & Future Vision', text:'How often do you feel emotionally ready and excited to move away from home for college or career opportunities?', indicator:'Emotional readiness for transition — low readiness may indicate separation anxiety or family dependency.', reversed:true, safetyQuestion:false },
  { id:47, part:'Part 8: Emotional Readiness & Future Vision', text:'How often do you feel optimistic about career opportunities in India or globally for your chosen field?', indicator:'Career optimism and future orientation — low optimism may signal anxiety, misinformation, or poor mentoring.', reversed:true, safetyQuestion:false },
  { id:48, part:'Part 8: Emotional Readiness & Future Vision', text:'How often do you feel genuinely proud and confident about the career path you are currently choosing?', indicator:'Career identity confidence — pride in one\'s career path is a strong predictor of commitment and perseverance.', reversed:true, safetyQuestion:false },
  { id:49, part:'Part 8: Emotional Readiness & Future Vision', text:'How often do you feel you have the resilience to handle failures, rejections, or major setbacks in your career journey?', indicator:'Career resilience — students who believe in their ability to recover from setbacks achieve more over time.', reversed:true, safetyQuestion:false },
  { id:50, part:'Part 8: Emotional Readiness & Future Vision', text:'How often do you feel that the career path you are choosing today is one you would still find meaningful five years from now?', indicator:'Long-term career vision stability — a core indicator of genuine career fit vs impulsive or pressure-driven choice.', reversed:true, safetyQuestion:false },
]

// ─── All questions by category ────────────────────────────────────────────────
export const QUESTIONS = {
  'student':           studentQuestions,
  'young-adult':       youngAdultQuestions,
  'married':           marriedQuestions,
  'divorced':          divorcedQuestions,
  'older':             olderQuestions,
  'single-mother':     singleMotherQuestions,
  'single-father':     singleFatherQuestions,
  'counselling-10th':  counselling10thQuestions,
  'counselling-12th':  counselling12thQuestions,
}

// ─── Scoring ──────────────────────────────────────────────────────────────────
/**
 * @param {Record<number, string>} answers  - { questionId: 'A' | 'B' | 'C' | 'D' }
 * @param {string} categoryId
 * @returns {{ score: number, total: number, safetyFlag: boolean, level: string, label: string, action: string, color: string }}
 */
// questions param allows DB-loaded questions to be passed in; falls back to static
export function calculateResult(answers, categoryId, questions = QUESTIONS[categoryId]) {
  const optionScore = { A: 1, B: 2, C: 3, D: 4 }

  let score = 0
  let safetyFlag = false
  let lowCount = 0  // A or B
  let highCount = 0 // C or D

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (!answer) return

    if (q.safetyQuestion && (answer === 'C' || answer === 'D')) safetyFlag = true

    // Numeric score (for display bar)
    const raw = optionScore[answer]
    score += q.reversed ? 5 - raw : raw

    // PDF pattern count (raw answer, not reversed)
    if (answer === 'A' || answer === 'B') lowCount++
    else highCount++
  })

  const total = questions.length
  const answered = lowCount + highCount
  const highRatio = answered > 0 ? highCount / answered : 0
  const lowRatio  = answered > 0 ? lowCount  / answered : 0

  // Classification follows the PDF scoring guide:
  // Mostly A's & B's (≥60% low) → Healthy Coping
  // Mostly C's & D's (≥60% high) → High Distress
  // Everything in between → Moderate Stress
  let level, label, action, color

  if (lowRatio >= 0.6) {
    level  = 'healthy'
    label  = 'Healthy Coping'
    color  = 'green'
    action = "You appear to be managing well. Continue encouraging open communication, healthy habits, and self-care. Remember it's always okay to talk to someone if things change."
  } else if (highRatio >= 0.6) {
    level  = 'high'
    label  = 'High Distress'
    color  = 'red'
    action = 'Your responses suggest you may be experiencing significant mental health challenges. We strongly encourage you to reach out to a counsellor, therapist, or trusted healthcare professional for a proper evaluation and support.'
  } else {
    level  = 'moderate'
    label  = 'Moderate Stress'
    color  = 'yellow'
    action = 'You may be feeling overwhelmed in certain areas of your life. Consider talking to a trusted person, introducing stress-relief activities, and paying attention to how you feel day to day.'
  }

  return { score, total, safetyFlag, level, label, action, color }
}
