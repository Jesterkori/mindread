// ─── Answer options (shared across all categories) ──────────────────────────
export const ANSWER_OPTIONS = [
  { value: 'A', label: 'Rarely or Never', score: 1 },
  { value: 'B', label: 'Sometimes',       score: 2 },
  { value: 'C', label: 'Often',           score: 3 },
  { value: 'D', label: 'Almost Always',   score: 4 },
]

// Kannada labels for the answer options — used only on the career-fit
// questionnaire (counselling-10th / counselling-12th), which supports an
// English/Kannada toggle. Values/scores are identical to ANSWER_OPTIONS;
// this only swaps the display label.
export const ANSWER_OPTIONS_KN = [
  { value: 'A', label: 'ಅಪರೂಪವಾಗಿ ಅಥವಾ ಎಂದಿಗೂ ಇಲ್ಲ', score: 1 },
  { value: 'B', label: 'ಕೆಲವೊಮ್ಮೆ',                     score: 2 },
  { value: 'C', label: 'ಆಗಾಗ್ಗೆ',                       score: 3 },
  { value: 'D', label: 'ಬಹುತೇಕ ಯಾವಾಗಲೂ',                score: 4 },
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

// ─── Counselling for 10th — career aptitude (50 questions from PDF) ──────────
const counselling10thQuestions = [
  // Part 1: Analytical, Logical & Scientific Thinking (Science / STEM) — Q1–10
  { id:1,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'Do you naturally enjoy solving hard math questions and working with numbers?', textKn:'ಕಷ್ಟಕರವಾದ ಗಣಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಬಿಡಿಸಲು ಮತ್ತು ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಲು ನಿಮಗೆ ಸಹಜವಾಗಿ ಇಷ್ಟವೇ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Assesses numerical aptitude and comfort with quantitative data (Core for PCM/Engineering).', reversed:false, safetyQuestion:false },
  { id:2,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'Do you naturally find yourself asking "how does this work?" when looking at machines, gadgets, or physical structures?', textKn:'ಯಂತ್ರಗಳು, ಸಾಧನಗಳು ಅಥವಾ ಭೌತಿಕ ರಚನೆಗಳನ್ನು ನೋಡುವಾಗ "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?" ಎಂದು ಸಹಜವಾಗಿ ಕೇಳಿಕೊಳ್ಳುತ್ತೀರಾ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Indicates scientific curiosity and mechanical aptitude.', reversed:false, safetyQuestion:false },
  { id:3,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How much do you like doing science experiments and following specific steps to test an idea?', textKn:'ವಿಜ್ಞಾನ ಪ್ರಯೋಗಗಳನ್ನು ಮಾಡಲು ಮತ್ತು ಒಂದು ಕಲ್ಪನೆಯನ್ನು ಪರೀಕ್ಷಿಸಲು ನಿರ್ದಿಷ್ಟ ಹಂತಗಳನ್ನು ಅನುಸರಿಸಲು ನಿಮಗೆ ಎಷ್ಟು ಇಷ್ಟ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Evaluates systematic thinking and interest in research/laboratory environments.', reversed:false, safetyQuestion:false },
  { id:4,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How frequently do you look for logical patterns and factual evidence before agreeing with an idea?', textKn:'ಒಂದು ಕಲ್ಪನೆಯನ್ನು ಒಪ್ಪುವ ಮೊದಲು ತಾರ್ಕಿಕ ಮಾದರಿಗಳು ಮತ್ತು ವಾಸ್ತವಿಕ ಪುರಾವೆಗಳನ್ನು ಎಷ್ಟು ಬಾರಿ ಹುಡುಕುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Strong critical thinking and analytical reasoning skills.', reversed:false, safetyQuestion:false },
  { id:5,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'Do you find it interesting to study biology and understand the inner workings of the human body?', textKn:'ಜೀವಶಾಸ್ತ್ರವನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದು ಮತ್ತು ಮಾನವ ದೇಹದ ಆಂತರಿಕ ಕಾರ್ಯವೈಖರಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ನಿಮಗೆ ಆಸಕ್ತಿದಾಯಕವೆನಿಸುತ್ತದೆಯೇ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'High interest in life sciences, biology, or medical fields (PCB).', reversed:false, safetyQuestion:false },
  { id:6,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How much do you like learning about space, physics, and how the universe works?', textKn:'ಬಾಹ್ಯಾಕಾಶ, ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ವಿಶ್ವ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂಬುದರ ಬಗ್ಗೆ ಕಲಿಯಲು ನಿಮಗೆ ಎಷ್ಟು ಇಷ್ಟ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Abstract scientific thinking and conceptual physics aptitude.', reversed:false, safetyQuestion:false },
  { id:7,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'Do you usually handle difficult problems by breaking them down into smaller, easier steps?', textKn:'ಕಷ್ಟಕರ ಸಮಸ್ಯೆಗಳನ್ನು ಸಣ್ಣ, ಸುಲಭವಾದ ಹಂತಗಳಾಗಿ ವಿಭಜಿಸುವ ಮೂಲಕ ನೀವು ಸಾಮಾನ್ಯವಾಗಿ ನಿಭಾಯಿಸುತ್ತೀರಾ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Algorithmic thinking, crucial for computer science and engineering.', reversed:false, safetyQuestion:false },
  { id:8,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How much do you like looking at charts, graphs, or data to figure out what they mean?', textKn:'ಚಾರ್ಟ್‌ಗಳು, ಗ್ರಾಫ್‌ಗಳು ಅಥವಾ ದತ್ತಾಂಶಗಳನ್ನು ನೋಡಿ ಅವುಗಳ ಅರ್ಥವೇನೆಂದು ಕಂಡುಹಿಡಿಯಲು ನಿಮಗೆ ಎಷ್ಟು ಇಷ್ಟ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Data literacy and interest in economics or data science.', reversed:false, safetyQuestion:false },
  { id:9,  part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How often do you watch videos or read about new discoveries in science?', textKn:'ವಿಜ್ಞಾನದಲ್ಲಿನ ಹೊಸ ಆವಿಷ್ಕಾರಗಳ ಬಗ್ಗೆ ವೀಡಿಯೊಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಅಥವಾ ಓದಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಇಷ್ಟಪಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Intrinsic motivation for continuous learning in STEM fields.', reversed:false, safetyQuestion:false },
  { id:10, part:'Part 1: Analytical, Logical & Scientific Thinking', text:'How much do you prefer subjects that have one correct answer instead of relying on personal opinions?', textKn:'ವೈಯಕ್ತಿಕ ಅಭಿಪ್ರಾಯಗಳ ಬದಲಿಗೆ ಒಂದೇ ಸರಿಯಾದ ಉತ್ತರವಿರುವ ವಿಷಯಗಳನ್ನು ನೀವು ಎಷ್ಟು ಇಷ್ಟಪಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ವಿಶ್ಲೇಷಣಾತ್ಮಕ, ತಾರ್ಕಿಕ ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಚಿಂತನೆ', indicator:'Preference for objective sciences over humanities.', reversed:false, safetyQuestion:false },
  // Part 2: Creativity, Expression & Humanities (Arts / Design / Literature) — Q11–20
  { id:11, part:'Part 2: Creativity, Expression & Humanities', text:'How much do you like writing stories, poems, or keeping a personal journal?', textKn:'ಕಥೆಗಳು, ಕವಿತೆಗಳನ್ನು ಬರೆಯಲು ಅಥವಾ ವೈಯಕ್ತಿಕ ದಿನಚರಿ ಬರೆಯಲು ನಿಮಗೆ ಎಷ್ಟು ಇಷ್ಟ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'High verbal linguistic intelligence and potential for literature, journalism, or content creation.', reversed:false, safetyQuestion:false },
  { id:12, part:'Part 2: Creativity, Expression & Humanities', text:'How often do you enjoy drawing, painting, or creating visual art?', textKn:'ಚಿತ್ರ ಬಿಡಿಸುವುದು, ಬಣ್ಣ ಹಚ್ಚುವುದು ಅಥವಾ ದೃಶ್ಯ ಕಲೆಯನ್ನು ರಚಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Visual-spatial intelligence, pointing toward fine arts, graphic design, or architecture.', reversed:false, safetyQuestion:false },
  { id:13, part:'Part 2: Creativity, Expression & Humanities', text:'How often do you enjoy reading about history, ancient civilizations, or how human societies evolved?', textKn:'ಇತಿಹಾಸ, ಪ್ರಾಚೀನ ನಾಗರಿಕತೆಗಳು ಅಥವಾ ಮಾನವ ಸಮಾಜಗಳು ಹೇಗೆ ವಿಕಸನಗೊಂಡವು ಎಂಬುದರ ಬಗ್ಗೆ ಓದುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Deep interest in humanities, history, and anthropology.', reversed:false, safetyQuestion:false },
  { id:14, part:'Part 2: Creativity, Expression & Humanities', text:'How frequently do you participate in or enjoy performing arts (theater, music, dance)?', textKn:'ಪ್ರದರ್ಶನ ಕಲೆಗಳಲ್ಲಿ (ರಂಗಭೂಮಿ, ಸಂಗೀತ, ನೃತ್ಯ) ನೀವು ಎಷ್ಟು ಬಾರಿ ಭಾಗವಹಿಸುತ್ತೀರಿ ಅಥವಾ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Expressive creativity and comfort in front of audiences.', reversed:false, safetyQuestion:false },
  { id:15, part:'Part 2: Creativity, Expression & Humanities', text:'How often do you find yourself analyzing the underlying themes in movies, books, or art?', textKn:'ಚಲನಚಿತ್ರಗಳು, ಪುಸ್ತಕಗಳು ಅಥವಾ ಕಲೆಯಲ್ಲಿನ ಆಧಾರ ವಿಷಯಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ವಿಶ್ಲೇಷಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Critical media analysis and strong abstract reasoning.', reversed:false, safetyQuestion:false },
  { id:16, part:'Part 2: Creativity, Expression & Humanities', text:'When given a project, how often do you focus heavily on making it look aesthetically pleasing?', textKn:'ಒಂದು ಯೋಜನೆಯನ್ನು ನೀಡಿದಾಗ, ಅದನ್ನು ಸೌಂದರ್ಯಪೂರ್ಣವಾಗಿ ಕಾಣುವಂತೆ ಮಾಡಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಹೆಚ್ಚು ಗಮನ ಹರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Design-oriented thinking and attention to visual detail.', reversed:false, safetyQuestion:false },
  { id:17, part:'Part 2: Creativity, Expression & Humanities', text:'How much do you enjoy debating philosophical ideas or discussing "what if" scenarios?', textKn:'ತಾತ್ವಿಕ ಆಲೋಚನೆಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸಲು ಅಥವಾ "ಏನಾದರೆ" ಸನ್ನಿವೇಶಗಳ ಬಗ್ಗೆ ಮಾತನಾಡಲು ನಿಮಗೆ ಎಷ್ಟು ಇಷ್ಟ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Abstract philosophical thinking, suited for law, philosophy, or political science.', reversed:false, safetyQuestion:false },
  { id:18, part:'Part 2: Creativity, Expression & Humanities', text:'How regularly do you come up with unconventional, out-of-the-box ideas that surprise others?', textKn:'ಇತರರನ್ನು ಅಚ್ಚರಿಗೊಳಿಸುವ ಅಸಾಂಪ್ರದಾಯಿಕ, ವಿಭಿನ್ನ ಆಲೋಚನೆಗಳನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಕಂಡುಕೊಳ್ಳುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Divergent thinking, highly valued in creative industries and advertising.', reversed:false, safetyQuestion:false },
  { id:19, part:'Part 2: Creativity, Expression & Humanities', text:'How often do you enjoy learning new languages or exploring foreign cultures?', textKn:'ಹೊಸ ಭಾಷೆಗಳನ್ನು ಕಲಿಯಲು ಅಥವಾ ವಿದೇಶಿ ಸಂಸ್ಕೃತಿಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಇಷ್ಟಪಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Linguistic aptitude and potential for international relations or translation.', reversed:false, safetyQuestion:false },
  { id:20, part:'Part 2: Creativity, Expression & Humanities', text:'How frequently do you prefer assignments where there is no single right answer, just your interpretation?', textKn:'ಒಂದೇ ಸರಿಯಾದ ಉತ್ತರವಿಲ್ಲದ, ಕೇವಲ ನಿಮ್ಮ ಸ್ವಂತ ವ್ಯಾಖ್ಯಾನಕ್ಕೆ ಅವಕಾಶವಿರುವ ಕಾರ್ಯಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ಅಭಿವ್ಯಕ್ತಿ ಮತ್ತು ಮಾನವಿಕ ಶಾಸ್ತ್ರಗಳು', indicator:'Comfort with ambiguity, a core trait of Arts and Humanities students.', reversed:false, safetyQuestion:false },
  // Part 3: Leadership, Business & Communication (Commerce / Management) — Q21–30
  { id:21, part:'Part 3: Leadership, Business & Communication', text:'How often do you naturally take charge when placed in a group project or team activity?', textKn:'ಗುಂಪು ಯೋಜನೆ ಅಥವಾ ತಂಡದ ಚಟುವಟಿಕೆಯಲ್ಲಿ ಇರಿಸಿದಾಗ ನೀವು ಸಹಜವಾಗಿ ಎಷ್ಟು ಬಾರಿ ನಾಯಕತ್ವ ವಹಿಸಿಕೊಳ್ಳುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Leadership aptitude and willingness to take responsibility.', reversed:false, safetyQuestion:false },
  { id:22, part:'Part 3: Leadership, Business & Communication', text:'How regularly do you find yourself interested in how businesses make money or how the economy works?', textKn:'ವ್ಯವಹಾರಗಳು ಹಣ ಹೇಗೆ ಗಳಿಸುತ್ತವೆ ಅಥವಾ ಆರ್ಥಿಕತೆ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂಬುದರ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಆಸಕ್ತಿ ಹೊಂದಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Commercial awareness and interest in finance, business, or economics.', reversed:false, safetyQuestion:false },
  { id:23, part:'Part 3: Leadership, Business & Communication', text:'How much do you enjoy organizing events, planning schedules, or managing logistics?', textKn:'ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುವುದು, ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಯೋಜಿಸುವುದು ಅಥವಾ ಸಾಗಣೆಯನ್ನು ನಿರ್ವಹಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'High organizational skills and project management potential.', reversed:false, safetyQuestion:false },
  { id:24, part:'Part 3: Leadership, Business & Communication', text:'How often are you able to confidently persuade others to see your point of view?', textKn:'ಇತರರನ್ನು ನಿಮ್ಮ ದೃಷ್ಟಿಕೋನವನ್ನು ಒಪ್ಪುವಂತೆ ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಮನವೊಲಿಸಲು ನಿಮಗೆ ಎಷ್ಟು ಬಾರಿ ಸಾಧ್ಯವಾಗುತ್ತದೆ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Strong negotiation and persuasive communication skills (Sales, Law, Management).', reversed:false, safetyQuestion:false },
  { id:25, part:'Part 3: Leadership, Business & Communication', text:'How frequently do you follow news about startups, stock markets, or famous entrepreneurs?', textKn:'ಸ್ಟಾರ್ಟಪ್‌ಗಳು, ಷೇರು ಮಾರುಕಟ್ಟೆಗಳು ಅಥವಾ ಪ್ರಸಿದ್ಧ ಉದ್ಯಮಿಗಳ ಕುರಿತ ಸುದ್ದಿಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಅನುಸರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Intrinsic motivation for entrepreneurship and commerce.', reversed:false, safetyQuestion:false },
  { id:26, part:'Part 3: Leadership, Business & Communication', text:'How often do you enjoy managing a budget, saving money, or calculating costs for activities?', textKn:'ಬಜೆಟ್ ನಿರ್ವಹಿಸುವುದು, ಹಣ ಉಳಿಸುವುದು ಅಥವಾ ಚಟುವಟಿಕೆಗಳ ವೆಚ್ಚ ಲೆಕ್ಕಹಾಕುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Financial literacy and potential for accounting or finance roles.', reversed:false, safetyQuestion:false },
  { id:27, part:'Part 3: Leadership, Business & Communication', text:'How comfortable are you with presenting information or speaking in front of a large class?', textKn:'ಮಾಹಿತಿಯನ್ನು ಪ್ರಸ್ತುತಪಡಿಸುವುದರಲ್ಲಿ ಅಥವಾ ದೊಡ್ಡ ತರಗತಿಯ ಮುಂದೆ ಮಾತನಾಡುವುದರಲ್ಲಿ ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Public speaking confidence and executive presence.', reversed:false, safetyQuestion:false },
  { id:28, part:'Part 3: Leadership, Business & Communication', text:'How regularly do you mediate conflicts between friends and help them find a compromise?', textKn:'ಸ್ನೇಹಿತರ ನಡುವಿನ ಭಿನ್ನಾಭಿಪ್ರಾಯಗಳನ್ನು ಬಗೆಹರಿಸಲು ಮತ್ತು ಒಪ್ಪಂದ ಕಂಡುಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಲು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಮಧ್ಯಸ್ಥಿಕೆ ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Diplomacy and human resource management skills.', reversed:false, safetyQuestion:false },
  { id:29, part:'Part 3: Leadership, Business & Communication', text:'How often do you focus on the most efficient way to get a job done to save time and resources?', textKn:'ಸಮಯ ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಉಳಿಸಲು ಕೆಲಸವನ್ನು ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಮುಗಿಸುವ ಮಾರ್ಗದ ಮೇಲೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಗಮನ ಹರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Operational thinking and business efficiency.', reversed:false, safetyQuestion:false },
  { id:30, part:'Part 3: Leadership, Business & Communication', text:'How much do you value networking and building a wide circle of contacts and friends?', textKn:'ಜಾಲಬಂಧ ನಿರ್ಮಿಸುವುದು ಮತ್ತು ವಿಶಾಲವಾದ ಸಂಪರ್ಕಗಳ ಹಾಗೂ ಸ್ನೇಹಿತರ ವಲಯವನ್ನು ಬೆಳೆಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಮೌಲ್ಯೀಕರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ನಾಯಕತ್ವ, ವ್ಯವಹಾರ ಮತ್ತು ಸಂವಹನ', indicator:'Interpersonal intelligence, crucial for business development and PR.', reversed:false, safetyQuestion:false },
  // Part 4: Empathy, Society & Healthcare (Social Sciences / Care / Medicine) — Q31–40
  { id:31, part:'Part 4: Empathy, Society & Healthcare', text:'How often do friends come to you for advice because you are a good listener?', textKn:'ನೀವು ಒಳ್ಳೆಯ ಆಲಿಸುಗ ಎಂಬ ಕಾರಣಕ್ಕೆ ಸ್ನೇಹಿತರು ಎಷ್ಟು ಬಾರಿ ಸಲಹೆಗಾಗಿ ನಿಮ್ಮ ಬಳಿ ಬರುತ್ತಾರೆ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'High emotional intelligence (EQ) and active listening skills (Psychology, Counseling).', reversed:false, safetyQuestion:false },
  { id:32, part:'Part 4: Empathy, Society & Healthcare', text:'How much do you care about solving social injustices or helping underprivileged communities?', textKn:'ಸಾಮಾಜಿಕ ಅನ್ಯಾಯಗಳನ್ನು ಬಗೆಹರಿಸುವುದು ಅಥವಾ ಹಿಂದುಳಿದ ಸಮುದಾಯಗಳಿಗೆ ಸಹಾಯ ಮಾಡುವುದರ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ಕಾಳಜಿ ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Civic-mindedness and passion for social work, NGO work, or public policy.', reversed:false, safetyQuestion:false },
  { id:33, part:'Part 4: Empathy, Society & Healthcare', text:'How frequently do you feel a strong desire to care for people or animals when they are sick?', textKn:'ಜನರು ಅಥವಾ ಪ್ರಾಣಿಗಳು ಅನಾರೋಗ್ಯದಿಂದಿದ್ದಾಗ ಅವರನ್ನು ಆರೈಕೆ ಮಾಡಬೇಕೆಂಬ ಬಲವಾದ ಬಯಕೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಅನುಭವಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Caregiving aptitude, pointing toward nursing, medicine, or veterinary sciences.', reversed:false, safetyQuestion:false },
  { id:34, part:'Part 4: Empathy, Society & Healthcare', text:'How often do you try to understand why people behave the way they do psychologically?', textKn:'ಜನರು ಮಾನಸಿಕವಾಗಿ ಆ ರೀತಿ ಏಕೆ ವರ್ತಿಸುತ್ತಾರೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಪ್ರಯತ್ನಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Strong interest in human behavior and psychology.', reversed:false, safetyQuestion:false },
  { id:35, part:'Part 4: Empathy, Society & Healthcare', text:'How comfortable are you remaining calm and helping others during stressful or emergency situations?', textKn:'ಒತ್ತಡದ ಅಥವಾ ತುರ್ತು ಸಂದರ್ಭಗಳಲ್ಲಿ ಶಾಂತವಾಗಿರಲು ಮತ್ತು ಇತರರಿಗೆ ಸಹಾಯ ಮಾಡಲು ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Crisis management skills, essential for emergency medicine or first responders.', reversed:false, safetyQuestion:false },
  { id:36, part:'Part 4: Empathy, Society & Healthcare', text:'How regularly do you volunteer your time to help teach or mentor younger students?', textKn:'ಚಿಕ್ಕ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಬೋಧಿಸಲು ಅಥವಾ ಮಾರ್ಗದರ್ಶನ ನೀಡಲು ನಿಮ್ಮ ಸಮಯವನ್ನು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಸ್ವಯಂಪ್ರೇರಿತರಾಗಿ ನೀಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Patience and aptitude for the education and teaching sectors.', reversed:false, safetyQuestion:false },
  { id:37, part:'Part 4: Empathy, Society & Healthcare', text:'How often do you put the needs of the group or others ahead of your own personal goals?', textKn:'ನಿಮ್ಮ ಸ್ವಂತ ಗುರಿಗಳಿಗಿಂತ ಗುಂಪಿನ ಅಥವಾ ಇತರರ ಅಗತ್ಯಗಳಿಗೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಆದ್ಯತೆ ನೀಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'High empathy and collaborative spirit.', reversed:false, safetyQuestion:false },
  { id:38, part:'Part 4: Empathy, Society & Healthcare', text:'How much do you enjoy studying the laws, rights, and civic duties of citizens?', textKn:'ನಾಗರಿಕರ ಕಾನೂನುಗಳು, ಹಕ್ಕುಗಳು ಮತ್ತು ನಾಗರಿಕ ಕರ್ತವ್ಯಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Interest in civics, public administration, and constitutional law.', reversed:false, safetyQuestion:false },
  { id:39, part:'Part 4: Empathy, Society & Healthcare', text:'How often do you feel deeply affected by the emotions and moods of the people around you?', textKn:'ನಿಮ್ಮ ಸುತ್ತಲಿನ ಜನರ ಭಾವನೆಗಳು ಮತ್ತು ಮನಸ್ಥಿತಿಗಳಿಂದ ನೀವು ಎಷ್ಟು ಬಾರಿ ಆಳವಾಗಿ ಪ್ರಭಾವಿತರಾಗುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'High emotional resonance, common in strong counselors and therapists.', reversed:false, safetyQuestion:false },
  { id:40, part:'Part 4: Empathy, Society & Healthcare', text:'How frequently do you desire a career where the primary goal is helping others rather than making money?', textKn:'ಹಣ ಗಳಿಸುವುದಕ್ಕಿಂತ ಇತರರಿಗೆ ಸಹಾಯ ಮಾಡುವುದೇ ಮುಖ್ಯ ಗುರಿಯಾಗಿರುವ ವೃತ್ತಿಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಸಹಾನುಭೂತಿ, ಸಮಾಜ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ', indicator:'Value alignment with non-profit, healthcare, or public service sectors.', reversed:false, safetyQuestion:false },
  // Part 5: Technology, Practical & Hands-On (IT / Vocational / Engineering) — Q41–50
  { id:41, part:'Part 5: Technology, Practical & Hands-On', text:'How often do you enjoy taking things apart (like electronics or gadgets) to see how they work?', textKn:'ಅವು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ ಎಂದು ನೋಡಲು ವಸ್ತುಗಳನ್ನು (ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಅಥವಾ ಸಾಧನಗಳಂತಹ) ಬಿಡಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Reverse-engineering skills and mechanical/hardware aptitude.', reversed:false, safetyQuestion:false },
  { id:42, part:'Part 5: Technology, Practical & Hands-On', text:'How regularly do you code, build websites, or explore how software applications are built?', textKn:'ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಕೋಡ್ ಬರೆಯುತ್ತೀರಿ, ವೆಬ್‌ಸೈಟ್‌ಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೀರಿ ಅಥವಾ ಸಾಫ್ಟ್‌ವೇರ್ ಅಪ್ಲಿಕೇಶನ್‌ಗಳನ್ನು ಹೇಗೆ ನಿರ್ಮಿಸಲಾಗುತ್ತದೆ ಎಂದು ಅನ್ವೇಷಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Computational thinking and affinity for Information Technology (IT).', reversed:false, safetyQuestion:false },
  { id:43, part:'Part 5: Technology, Practical & Hands-On', text:'How much do you prefer physical, hands-on work over sitting at a desk reading textbooks?', textKn:'ಪಠ್ಯಪುಸ್ತಕಗಳನ್ನು ಓದುತ್ತಾ ಮೇಜಿನ ಬಳಿ ಕುಳಿತುಕೊಳ್ಳುವುದಕ್ಕಿಂತ ದೈಹಿಕ, ಕೈಯಾರೆ ಮಾಡುವ ಕೆಲಸವನ್ನು ನೀವು ಎಷ್ಟು ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Kinesthetic learning style, pointing toward vocational trades, mechanics, or applied engineering.', reversed:false, safetyQuestion:false },
  { id:44, part:'Part 5: Technology, Practical & Hands-On', text:'How frequently do you build things with your hands (woodworking, robotics, models, crafts)?', textKn:'ನೀವು ಎಷ್ಟು ಬಾರಿ ನಿಮ್ಮ ಕೈಗಳಿಂದ ವಸ್ತುಗಳನ್ನು ನಿರ್ಮಿಸುತ್ತೀರಿ (ಮರಗೆಲಸ, ರೋಬೋಟಿಕ್ಸ್, ಮಾದರಿಗಳು, ಕರಕುಶಲ ಕಲೆ)?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Spatial reasoning and practical construction skills.', reversed:false, safetyQuestion:false },
  { id:45, part:'Part 5: Technology, Practical & Hands-On', text:'How often do you become the "tech support" person for your family when devices break?', textKn:'ಸಾಧನಗಳು ಹಾಳಾದಾಗ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ "ತಂತ್ರಜ್ಞಾನ ಬೆಂಬಲ" ವ್ಯಕ್ತಿಯಾಗಿ ನೀವು ಎಷ್ಟು ಬಾರಿ ಆಗುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Intuitive understanding of modern technology and troubleshooting.', reversed:false, safetyQuestion:false },
  { id:46, part:'Part 5: Technology, Practical & Hands-On', text:'How comfortable are you spending hours focused on a computer screen solving technical errors?', textKn:'ತಾಂತ್ರಿಕ ದೋಷಗಳನ್ನು ಬಗೆಹರಿಸಲು ಕಂಪ್ಯೂಟರ್ ಪರದೆಯ ಮೇಲೆ ಗಂಟೆಗಳ ಕಾಲ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಿ ಕುಳಿತುಕೊಳ್ಳಲು ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'High digital tolerance and debugging resilience.', reversed:false, safetyQuestion:false },
  { id:47, part:'Part 5: Technology, Practical & Hands-On', text:'How regularly do you follow the latest trends in Artificial Intelligence, gaming, or cybersecurity?', textKn:'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ, ಗೇಮಿಂಗ್ ಅಥವಾ ಸೈಬರ್ ಭದ್ರತೆಯಲ್ಲಿನ ಇತ್ತೀಚಿನ ಪ್ರವೃತ್ತಿಗಳನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಅನುಸರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Forward-looking interest in emerging tech sectors.', reversed:false, safetyQuestion:false },
  { id:48, part:'Part 5: Technology, Practical & Hands-On', text:'How often do you enjoy using specialized tools, machinery, or complex equipment?', textKn:'ವಿಶೇಷ ಉಪಕರಣಗಳು, ಯಂತ್ರೋಪಕರಣಗಳು ಅಥವಾ ಸಂಕೀರ್ಣ ಸಾಧನಗಳನ್ನು ಬಳಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Comfort with industrial or specialized technical environments.', reversed:false, safetyQuestion:false },
  { id:49, part:'Part 5: Technology, Practical & Hands-On', text:'How much do you enjoy designing digital media like 3D models, video edits, or digital music?', textKn:'3D ಮಾದರಿಗಳು, ವೀಡಿಯೊ ಎಡಿಟಿಂಗ್ ಅಥವಾ ಡಿಜಿಟಲ್ ಸಂಗೀತದಂತಹ ಡಿಜಿಟಲ್ ಮಾಧ್ಯಮವನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Blend of technical and creative skills (UI/UX, multimedia arts).', reversed:false, safetyQuestion:false },
  { id:50, part:'Part 5: Technology, Practical & Hands-On', text:'How frequently do you prefer learning by "trial and error" rather than reading the instruction manual?', textKn:'ಸೂಚನಾ ಕೈಪಿಡಿಯನ್ನು ಓದುವುದಕ್ಕಿಂತ "ಪ್ರಯತ್ನ ಮತ್ತು ದೋಷ" ವಿಧಾನದ ಮೂಲಕ ಕಲಿಯಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ತಂತ್ರಜ್ಞಾನ, ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ಕೈಯಾರೆ ಕೆಲಸ', indicator:'Experiential learning style, highly suited for fast-paced tech and vocational fields.', reversed:false, safetyQuestion:false },
]

// ─── Counselling for 12th — career aptitude (50 questions from PDF) ───────────
const counselling12thQuestions = [
  // Part 1: Research, Analytics & Deep Tech (Engineering / Data / Sciences) — Q1–10
  { id:1,  part:'Part 1: Research, Analytics & Deep Tech', text:'How often do you seek to understand the complex mathematical algorithms behind everyday technology?', textKn:'ದೈನಂದಿನ ತಂತ್ರಜ್ಞಾನದ ಹಿಂದಿನ ಸಂಕೀರ್ಣ ಗಣಿತೀಯ ಅಲ್ಗಾರಿದಮ್‌ಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಪ್ರಯತ್ನಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Assesses advanced quantitative aptitude and interest in computer science or data analytics.', reversed:false, safetyQuestion:false },
  { id:2,  part:'Part 1: Research, Analytics & Deep Tech', text:'How regularly do you read scientific journals, tech blogs, or articles about quantum physics and space exploration?', textKn:'ಕ್ವಾಂಟಮ್ ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ಬಾಹ್ಯಾಕಾಶ ಅನ್ವೇಷಣೆಯ ಕುರಿತು ವೈಜ್ಞಾನಿಕ ಜರ್ನಲ್‌ಗಳು, ಟೆಕ್ ಬ್ಲಾಗ್‌ಗಳು ಅಥವಾ ಲೇಖನಗಳನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಓದುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Indicates deep scientific curiosity suited for pure sciences or research.', reversed:false, safetyQuestion:false },
  { id:3,  part:'Part 1: Research, Analytics & Deep Tech', text:'How much do you enjoy taking a massive set of disorganized data and finding clear trends or patterns within it?', textKn:'ಅಸ್ತವ್ಯಸ್ತವಾದ ದೊಡ್ಡ ಪ್ರಮಾಣದ ದತ್ತಾಂಶವನ್ನು ತೆಗೆದುಕೊಂಡು ಅದರಲ್ಲಿ ಸ್ಪಷ್ಟ ಪ್ರವೃತ್ತಿಗಳು ಅಥವಾ ಮಾದರಿಗಳನ್ನು ಕಂಡುಹಿಡಿಯುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Evaluates data literacy and aptitude for statistics or financial engineering.', reversed:false, safetyQuestion:false },
  { id:4,  part:'Part 1: Research, Analytics & Deep Tech', text:'How frequently do you approach arguments by demanding empirical evidence and peer-reviewed facts?', textKn:'ಅನುಭವಾಧಾರಿತ ಪುರಾವೆ ಮತ್ತು ಪರಾಮರ್ಶಿತ ಸತ್ಯಾಂಶಗಳನ್ನು ಬೇಡುವ ಮೂಲಕ ನೀವು ಎಷ್ಟು ಬಾರಿ ವಾದಗಳನ್ನು ಸಮೀಪಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Strong objective reasoning, essential for scientific and technical fields.', reversed:false, safetyQuestion:false },
  { id:5,  part:'Part 1: Research, Analytics & Deep Tech', text:'How often do you write code, automate simple tasks on your computer, or build basic software/hardware projects?', textKn:'ಕೋಡ್ ಬರೆಯಲು, ನಿಮ್ಮ ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಸರಳ ಕಾರ್ಯಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತಗೊಳಿಸಲು ಅಥವಾ ಮೂಲಭೂತ ಸಾಫ್ಟ್‌ವೇರ್/ಹಾರ್ಡ್‌ವೇರ್ ಯೋಜನೆಗಳನ್ನು ನಿರ್ಮಿಸಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಮುಂದಾಗುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Practical affinity for software engineering and IT development.', reversed:false, safetyQuestion:false },
  { id:6,  part:'Part 1: Research, Analytics & Deep Tech', text:'How much do you enjoy studying the microscopic details of biology, genetics, or organic chemistry?', textKn:'ಜೀವಶಾಸ್ತ್ರ, ತಳಿಶಾಸ್ತ್ರ ಅಥವಾ ಸಾವಯವ ರಸಾಯನಶಾಸ್ತ್ರದ ಸೂಕ್ಷ್ಮ ವಿವರಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'High interest in biotechnology, pharmacology, or advanced life sciences.', reversed:false, safetyQuestion:false },
  { id:7,  part:'Part 1: Research, Analytics & Deep Tech', text:'When a machine or device breaks, how often is your first instinct to dismantle it to find the root mechanical failure?', textKn:'ಒಂದು ಯಂತ್ರ ಅಥವಾ ಸಾಧನ ಹಾಳಾದಾಗ, ಅದರ ಮೂಲ ಯಾಂತ್ರಿಕ ದೋಷವನ್ನು ಕಂಡುಹಿಡಿಯಲು ಅದನ್ನು ಬಿಚ್ಚುವುದು ನಿಮ್ಮ ಮೊದಲ ಸಹಜ ಪ್ರತಿಕ್ರಿಯೆಯಾಗಿರುತ್ತದೆಯೇ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Mechanical engineering and hardware troubleshooting aptitude.', reversed:false, safetyQuestion:false },
  { id:8,  part:'Part 1: Research, Analytics & Deep Tech', text:'How often do you enjoy solving high-level calculus or physics problems that require multiple steps to complete?', textKn:'ಪೂರ್ಣಗೊಳಿಸಲು ಹಲವಾರು ಹಂತಗಳ ಅಗತ್ಯವಿರುವ ಉನ್ನತ ಮಟ್ಟದ ಕಲನಶಾಸ್ತ್ರ ಅಥವಾ ಭೌತಶಾಸ್ತ್ರದ ಸಮಸ್ಯೆಗಳನ್ನು ಬಿಡಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Tolerance for rigorous, long-form analytical problem-solving.', reversed:false, safetyQuestion:false },
  { id:9,  part:'Part 1: Research, Analytics & Deep Tech', text:'How frequently do you think about how sustainable energy or new materials can solve global environmental issues?', textKn:'ಸುಸ್ಥಿರ ಶಕ್ತಿ ಅಥವಾ ಹೊಸ ವಸ್ತುಗಳು ಜಾಗತಿಕ ಪರಿಸರ ಸಮಸ್ಯೆಗಳನ್ನು ಹೇಗೆ ಪರಿಹರಿಸಬಹುದು ಎಂದು ನೀವು ಎಷ್ಟು ಬಾರಿ ಯೋಚಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Interest in environmental engineering and sustainable technology.', reversed:false, safetyQuestion:false },
  { id:10, part:'Part 1: Research, Analytics & Deep Tech', text:'How often do you prefer working independently in a quiet environment to focus on deeply complex tasks?', textKn:'ಆಳವಾದ ಸಂಕೀರ್ಣ ಕೆಲಸಗಳ ಮೇಲೆ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಲು ಶಾಂತ ವಾತಾವರಣದಲ್ಲಿ ಸ್ವತಂತ್ರವಾಗಿ ಕೆಲಸ ಮಾಡಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 1: ಸಂಶೋಧನೆ, ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಆಳ ತಂತ್ರಜ್ಞಾನ', indicator:'Comfort with the isolated focus required in research and development roles.', reversed:false, safetyQuestion:false },
  // Part 2: Creativity, Design & Media (Architecture / Fine Arts / Media) — Q11–20
  { id:11, part:'Part 2: Creativity, Design & Media', text:'How often do you find yourself critiquing the typography, color palette, or layout of apps and websites?', textKn:'ಆಪ್‌ಗಳ ಮತ್ತು ವೆಬ್‌ಸೈಟ್‌ಗಳ ಅಕ್ಷರಶೈಲಿ, ಬಣ್ಣ ಸಂಯೋಜನೆ ಅಥವಾ ವಿನ್ಯಾಸವನ್ನು ವಿಮರ್ಶಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಕಂಡುಕೊಳ್ಳುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'High visual-spatial intelligence and UI/UX design aptitude.', reversed:false, safetyQuestion:false },
  { id:12, part:'Part 2: Creativity, Design & Media', text:'How regularly do you produce original creative content like short films, digital art, or creative writing?', textKn:'ಕಿರುಚಿತ್ರಗಳು, ಡಿಜಿಟಲ್ ಕಲೆ ಅಥವಾ ಸೃಜನಶೀಲ ಬರವಣಿಗೆಯಂತಹ ಮೂಲ ಸೃಜನಶೀಲ ವಿಷಯವನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ರಚಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Drive for media production, journalism, or digital arts.', reversed:false, safetyQuestion:false },
  { id:13, part:'Part 2: Creativity, Design & Media', text:'How much do you enjoy studying how physical spaces affect human emotion and behavior?', textKn:'ಭೌತಿಕ ಸ್ಥಳಗಳು ಮಾನವ ಭಾವನೆ ಮತ್ತು ವರ್ತನೆಯ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತವೆ ಎಂಬುದನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Spatial reasoning suited for architecture or interior design.', reversed:false, safetyQuestion:false },
  { id:14, part:'Part 2: Creativity, Design & Media', text:'How frequently do you follow fashion trends, industrial design, or modern art movements?', textKn:'ಫ್ಯಾಷನ್ ಪ್ರವೃತ್ತಿಗಳು, ಕೈಗಾರಿಕಾ ವಿನ್ಯಾಸ ಅಥವಾ ಆಧುನಿಕ ಕಲಾ ಚಳುವಳಿಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಅನುಸರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Intrinsic motivation for aesthetics and commercial design.', reversed:false, safetyQuestion:false },
  { id:15, part:'Part 2: Creativity, Design & Media', text:'How often do you use storytelling (written, spoken, or visual) to convince people of your ideas?', textKn:'ನಿಮ್ಮ ಆಲೋಚನೆಗಳ ಬಗ್ಗೆ ಜನರನ್ನು ಮನವೊಲಿಸಲು ಕಥೆ ಹೇಳುವಿಕೆಯನ್ನು (ಬರಹ, ಮಾತು ಅಥವಾ ದೃಶ್ಯ) ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಳಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Strong narrative skills, highly valued in advertising, marketing, and filmmaking.', reversed:false, safetyQuestion:false },
  { id:16, part:'Part 2: Creativity, Design & Media', text:'When faced with a project, how often do you prioritize making the final product beautiful and emotionally engaging?', textKn:'ಒಂದು ಯೋಜನೆ ಎದುರಾದಾಗ, ಅಂತಿಮ ಉತ್ಪನ್ನವನ್ನು ಸುಂದರವಾಗಿ ಮತ್ತು ಭಾವನಾತ್ಮಕವಾಗಿ ಆಕರ್ಷಕವಾಗಿ ಮಾಡುವುದಕ್ಕೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಆದ್ಯತೆ ನೀಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Design-oriented thinking over pure utilitarianism.', reversed:false, safetyQuestion:false },
  { id:17, part:'Part 2: Creativity, Design & Media', text:'How much do you enjoy editing audio, manipulating photos, or using creative software like Adobe Creative Cloud?', textKn:'ಆಡಿಯೊ ಎಡಿಟ್ ಮಾಡುವುದು, ಫೋಟೋಗಳನ್ನು ಬದಲಾಯಿಸುವುದು ಅಥವಾ Adobe Creative Cloud ನಂತಹ ಸೃಜನಶೀಲ ಸಾಫ್ಟ್‌ವೇರ್ ಬಳಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Technical proficiency in digital media tools.', reversed:false, safetyQuestion:false },
  { id:18, part:'Part 2: Creativity, Design & Media', text:'How regularly do you come up with unconventional solutions that challenge traditional rules and norms?', textKn:'ಸಾಂಪ್ರದಾಯಿಕ ನಿಯಮಗಳು ಮತ್ತು ಮಾನದಂಡಗಳಿಗೆ ಸವಾಲು ಹಾಕುವ ಅಸಾಂಪ್ರದಾಯಿಕ ಪರಿಹಾರಗಳನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಕಂಡುಕೊಳ್ಳುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Divergent thinking, a core trait of successful creatives and innovators.', reversed:false, safetyQuestion:false },
  { id:19, part:'Part 2: Creativity, Design & Media', text:'How often do you observe human behavior to understand what kind of entertainment or art they would consume?', textKn:'ಜನರು ಯಾವ ರೀತಿಯ ಮನರಂಜನೆ ಅಥವಾ ಕಲೆಯನ್ನು ಬಯಸುತ್ತಾರೆ ಎಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮಾನವ ವರ್ತನೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಗಮನಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Insight into consumer psychology for mass media and entertainment.', reversed:false, safetyQuestion:false },
  { id:20, part:'Part 2: Creativity, Design & Media', text:'How frequently do you prefer assignments that allow you complete creative freedom over strict, rule-based rubrics?', textKn:'ಕಠಿಣ, ನಿಯಮ ಆಧಾರಿತ ಮಾನದಂಡಗಳಿಗಿಂತ ಸಂಪೂರ್ಣ ಸೃಜನಶೀಲ ಸ್ವಾತಂತ್ರ್ಯ ನೀಡುವ ಕಾರ್ಯಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 2: ಸೃಜನಶೀಲತೆ, ವಿನ್ಯಾಸ ಮತ್ತು ಮಾಧ್ಯಮ', indicator:'Comfort with creative ambiguity and self-directed projects.', reversed:false, safetyQuestion:false },
  // Part 3: Enterprise, Finance & Strategy (Management / Commerce / Law) — Q21–30
  { id:21, part:'Part 3: Enterprise, Finance & Strategy', text:'How often do you analyze how global events (like politics or wars) impact the stock market and local economy?', textKn:'ಜಾಗತಿಕ ಘಟನೆಗಳು (ರಾಜಕೀಯ ಅಥವಾ ಯುದ್ಧಗಳಂತಹ) ಷೇರು ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಸ್ಥಳೀಯ ಆರ್ಥಿಕತೆಯ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತವೆ ಎಂದು ನೀವು ಎಷ್ಟು ಬಾರಿ ವಿಶ್ಲೇಷಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Macro-economic awareness and interest in global finance.', reversed:false, safetyQuestion:false },
  { id:22, part:'Part 3: Enterprise, Finance & Strategy', text:'How regularly do you take the lead in organizing school events, managing the budget, and delegating tasks?', textKn:'ಶಾಲಾ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆಯೋಜಿಸುವಲ್ಲಿ, ಬಜೆಟ್ ನಿರ್ವಹಿಸುವಲ್ಲಿ ಮತ್ತು ಕೆಲಸಗಳನ್ನು ಹಂಚುವಲ್ಲಿ ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಮುಂದಾಳತ್ವ ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Executive leadership, project management, and operational aptitude.', reversed:false, safetyQuestion:false },
  { id:23, part:'Part 3: Enterprise, Finance & Strategy', text:'How much do you enjoy reading about corporate mergers, startup funding, or the success stories of billionaires?', textKn:'ಕಾರ್ಪೊರೇಟ್ ವಿಲೀನಗಳು, ಸ್ಟಾರ್ಟಪ್ ಹಣಕಾಸು ಅಥವಾ ಕೋಟ್ಯಧಿಪತಿಗಳ ಯಶೋಗಾಥೆಗಳ ಬಗ್ಗೆ ಓದುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Commercial drive and interest in corporate strategy or entrepreneurship.', reversed:false, safetyQuestion:false },
  { id:24, part:'Part 3: Enterprise, Finance & Strategy', text:'How often are you able to negotiate a better deal for yourself, whether buying something or arguing for a grade?', textKn:'ಏನನ್ನಾದರೂ ಖರೀದಿಸುವಾಗ ಅಥವಾ ಅಂಕಗಳಿಗಾಗಿ ವಾದಿಸುವಾಗ, ನಿಮಗಾಗಿ ಉತ್ತಮ ಒಪ್ಪಂದ ಮಾಡಿಕೊಳ್ಳಲು ನಿಮಗೆ ಎಷ್ಟು ಬಾರಿ ಸಾಧ್ಯವಾಗುತ್ತದೆ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Strong negotiation, persuasion, and sales skills.', reversed:false, safetyQuestion:false },
  { id:25, part:'Part 3: Enterprise, Finance & Strategy', text:'How frequently do you track your personal finances, investments, or enjoy studying accounting principles?', textKn:'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಹಣಕಾಸು, ಹೂಡಿಕೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಅಥವಾ ಲೆಕ್ಕಪತ್ರ ತತ್ವಗಳನ್ನು ಅಧ್ಯಯನ ಮಾಡಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಇಷ್ಟಪಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'High financial literacy, pointing toward Chartered Accountancy (CA) or investment banking.', reversed:false, safetyQuestion:false },
  { id:26, part:'Part 3: Enterprise, Finance & Strategy', text:'How often do you enjoy debating corporate ethics, business laws, or intellectual property rights?', textKn:'ಕಾರ್ಪೊರೇಟ್ ನೈತಿಕತೆ, ವ್ಯವಹಾರ ಕಾನೂನುಗಳು ಅಥವಾ ಬೌದ್ಧಿಕ ಆಸ್ತಿ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಚರ್ಚಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Analytical thinking suited for corporate law or business administration.', reversed:false, safetyQuestion:false },
  { id:27, part:'Part 3: Enterprise, Finance & Strategy', text:'How comfortable are you standing in front of a room of adults and pitching a business idea or formal presentation?', textKn:'ವಯಸ್ಕರ ಕೋಣೆಯ ಮುಂದೆ ನಿಂತು ವ್ಯವಹಾರ ಕಲ್ಪನೆ ಅಥವಾ ಔಪಚಾರಿಕ ಪ್ರಸ್ತುತಿ ನೀಡಲು ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Executive presence and high-stakes public speaking confidence.', reversed:false, safetyQuestion:false },
  { id:28, part:'Part 3: Enterprise, Finance & Strategy', text:'How regularly do you look for ways to optimize a system to maximize profit or minimize wasted time?', textKn:'ಲಾಭವನ್ನು ಗರಿಷ್ಠಗೊಳಿಸಲು ಅಥವಾ ವ್ಯರ್ಥ ಸಮಯವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಒಂದು ವ್ಯವಸ್ಥೆಯನ್ನು ಉತ್ತಮಗೊಳಿಸುವ ಮಾರ್ಗಗಳನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಹುಡುಕುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Strategic business thinking and operational efficiency.', reversed:false, safetyQuestion:false },
  { id:29, part:'Part 3: Enterprise, Finance & Strategy', text:'How often do you naturally act as the mediator when two groups have a conflict of interest?', textKn:'ಎರಡು ಗುಂಪುಗಳ ನಡುವೆ ಹಿತಾಸಕ್ತಿ ಸಂಘರ್ಷ ಇರುವಾಗ ನೀವು ಸಹಜವಾಗಿ ಎಷ್ಟು ಬಾರಿ ಮಧ್ಯಸ್ಥಿಕೆದಾರರಾಗಿ ವರ್ತಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Diplomacy, crucial for human resources and international business relations.', reversed:false, safetyQuestion:false },
  { id:30, part:'Part 3: Enterprise, Finance & Strategy', text:'How much do you value building a strategic network of contacts who can help you advance your professional goals?', textKn:'ನಿಮ್ಮ ವೃತ್ತಿಪರ ಗುರಿಗಳನ್ನು ಮುಂದುವರಿಸಲು ಸಹಾಯ ಮಾಡುವ ಕಾರ್ಯತಂತ್ರದ ಸಂಪರ್ಕಗಳ ಜಾಲವನ್ನು ನಿರ್ಮಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಮೌಲ್ಯೀಕರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 3: ಉದ್ಯಮ, ಹಣಕಾಸು ಮತ್ತು ಕಾರ್ಯತಂತ್ರ', indicator:'Networking acumen and business development focus.', reversed:false, safetyQuestion:false },
  // Part 4: Human Health, Society & Law (Medicine / Psychology / Civil Services) — Q31–40
  { id:31, part:'Part 4: Human Health, Society & Law', text:'How often do you read about human psychology, mental health disorders, or neurological functions?', textKn:'ಮಾನವ ಮನೋವಿಜ್ಞಾನ, ಮಾನಸಿಕ ಆರೋಗ್ಯ ಅಸ್ವಸ್ಥತೆಗಳು ಅಥವಾ ನರವೈಜ್ಞಾನಿಕ ಕಾರ್ಯಗಳ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಓದುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Deep interest in clinical psychology, psychiatry, or counseling.', reversed:false, safetyQuestion:false },
  { id:32, part:'Part 4: Human Health, Society & Law', text:'How much do you care about studying the legal system to protect human rights or fight social injustice?', textKn:'ಮಾನವ ಹಕ್ಕುಗಳನ್ನು ರಕ್ಷಿಸಲು ಅಥವಾ ಸಾಮಾಜಿಕ ಅನ್ಯಾಯದ ವಿರುದ್ಧ ಹೋರಾಡಲು ಕಾನೂನು ವ್ಯವಸ್ಥೆಯನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದರ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ಕಾಳಜಿ ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Passion for constitutional law, human rights advocacy, or NGO leadership.', reversed:false, safetyQuestion:false },
  { id:33, part:'Part 4: Human Health, Society & Law', text:'How frequently do you feel a strong calling to work in a hospital environment, despite the high stress and long hours?', textKn:'ಹೆಚ್ಚಿನ ಒತ್ತಡ ಮತ್ತು ದೀರ್ಘ ಕೆಲಸದ ಸಮಯದ ಹೊರತಾಗಿಯೂ, ಆಸ್ಪತ್ರೆಯ ವಾತಾವರಣದಲ್ಲಿ ಕೆಲಸ ಮಾಡಬೇಕೆಂಬ ಬಲವಾದ ಕರೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಅನುಭವಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'High resilience and dedication required for medicine, nursing, or surgery.', reversed:false, safetyQuestion:false },
  { id:34, part:'Part 4: Human Health, Society & Law', text:'How often do you analyze the root causes of poverty, crime, or educational inequality in your country?', textKn:'ನಿಮ್ಮ ದೇಶದಲ್ಲಿನ ಬಡತನ, ಅಪರಾಧ ಅಥವಾ ಶೈಕ್ಷಣಿಕ ಅಸಮಾನತೆಯ ಮೂಲ ಕಾರಣಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ವಿಶ್ಲೇಷಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Civic-mindedness and aptitude for sociology or public administration (Civil Services).', reversed:false, safetyQuestion:false },
  { id:35, part:'Part 4: Human Health, Society & Law', text:'How comfortable are you handling blood, injuries, or being the first responder in a medical emergency?', textKn:'ರಕ್ತ, ಗಾಯಗಳನ್ನು ನಿಭಾಯಿಸಲು ಅಥವಾ ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿಯಲ್ಲಿ ಮೊದಲ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡುವವರಾಗಲು ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Clinical detachment and crisis management, essential for medical fields.', reversed:false, safetyQuestion:false },
  { id:36, part:'Part 4: Human Health, Society & Law', text:'How regularly do you study international relations, geopolitics, or how different governments interact?', textKn:'ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಂಬಂಧಗಳು, ಭೂರಾಜಕೀಯ ಅಥವಾ ವಿವಿಧ ಸರ್ಕಾರಗಳು ಹೇಗೆ ಸಂವಹನ ನಡೆಸುತ್ತವೆ ಎಂಬುದನ್ನು ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಅಧ್ಯಯನ ಮಾಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Interest in political science, foreign service, or diplomacy.', reversed:false, safetyQuestion:false },
  { id:37, part:'Part 4: Human Health, Society & Law', text:'How often do you prioritize understanding a person\'s emotional background before judging their actions?', textKn:'ಒಬ್ಬ ವ್ಯಕ್ತಿಯ ಕ್ರಿಯೆಗಳನ್ನು ನಿರ್ಣಯಿಸುವ ಮೊದಲು ಅವರ ಭಾವನಾತ್ಮಕ ಹಿನ್ನೆಲೆಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ನೀವು ಎಷ್ಟು ಬಾರಿ ಆದ್ಯತೆ ನೀಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'High emotional intelligence (EQ) and empathetic reasoning.', reversed:false, safetyQuestion:false },
  { id:38, part:'Part 4: Human Health, Society & Law', text:'How much do you enjoy studying the anatomy of the human body and how different diseases affect it?', textKn:'ಮಾನವ ದೇಹದ ಅಂಗರಚನಾಶಾಸ್ತ್ರ ಮತ್ತು ವಿವಿಧ ರೋಗಗಳು ಅದರ ಮೇಲೆ ಹೇಗೆ ಪರಿಣಾಮ ಬೀರುತ್ತವೆ ಎಂಬುದನ್ನು ಅಧ್ಯಯನ ಮಾಡುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Core scientific interest aligned with medical and allied health sciences.', reversed:false, safetyQuestion:false },
  { id:39, part:'Part 4: Human Health, Society & Law', text:'How often do you debate the ethical implications of new laws, medical procedures, or government policies?', textKn:'ಹೊಸ ಕಾನೂನುಗಳು, ವೈದ್ಯಕೀಯ ಪ್ರಕ್ರಿಯೆಗಳು ಅಥವಾ ಸರ್ಕಾರಿ ನೀತಿಗಳ ನೈತಿಕ ಪರಿಣಾಮಗಳ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ಬಾರಿ ಚರ್ಚಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Bioethics and legal reasoning aptitude.', reversed:false, safetyQuestion:false },
  { id:40, part:'Part 4: Human Health, Society & Law', text:'How frequently do you envision a career where your primary metric of success is the number of lives you have improved?', textKn:'ನೀವು ಸುಧಾರಿಸಿದ ಜೀವನಗಳ ಸಂಖ್ಯೆಯೇ ಯಶಸ್ಸಿನ ಮುಖ್ಯ ಮಾನದಂಡವಾಗಿರುವ ವೃತ್ತಿಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಕಲ್ಪಿಸಿಕೊಳ್ಳುತ್ತೀರಿ?', partKn:'ಭಾಗ 4: ಮಾನವ ಆರೋಗ್ಯ, ಸಮಾಜ ಮತ್ತು ಕಾನೂನು', indicator:'Strong value alignment with public service and healthcare sectors.', reversed:false, safetyQuestion:false },
  // Part 5: Execution, Operations & Applied Skills (Vocational / Aviation / Hospitality) — Q41–50
  { id:41, part:'Part 5: Execution, Operations & Applied Skills', text:'How often do you thrive in fast-paced environments where you have to be constantly on your feet and moving?', textKn:'ನಿರಂತರವಾಗಿ ಓಡಾಡುತ್ತಾ, ಚಟುವಟಿಕೆಯಿಂದ ಇರಬೇಕಾದ ವೇಗದ ವಾತಾವರಣಗಳಲ್ಲಿ ನೀವು ಎಷ್ಟು ಬಾರಿ ಉತ್ತಮವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'High physical stamina suited for hospitality, event management, or culinary arts.', reversed:false, safetyQuestion:false },
  { id:42, part:'Part 5: Execution, Operations & Applied Skills', text:'How regularly do you obsess over the perfect execution of a live event, dinner service, or travel itinerary?', textKn:'ಲೈವ್ ಈವೆಂಟ್, ಊಟದ ಸೇವೆ ಅಥವಾ ಪ್ರಯಾಣದ ಯೋಜನೆಯ ಪರಿಪೂರ್ಣ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆಯ ಬಗ್ಗೆ ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ತೀವ್ರ ಕಾಳಜಿ ವಹಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Precision in operations and logistics management.', reversed:false, safetyQuestion:false },
  { id:43, part:'Part 5: Execution, Operations & Applied Skills', text:'How much do you prefer practical, on-the-job training (like internships or apprenticeships) over sitting in a lecture hall?', textKn:'ಉಪನ್ಯಾಸ ಕೊಠಡಿಯಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳುವುದಕ್ಕಿಂತ ಪ್ರಾಯೋಗಿಕ, ಕೆಲಸದ ಸ್ಥಳದ ತರಬೇತಿಯನ್ನು (ಇಂಟರ್ನ್‌ಶಿಪ್ ಅಥವಾ ಅಪ್ರೆಂಟಿಸ್‌ಶಿಪ್‌ನಂತಹ) ನೀವು ಎಷ್ಟು ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Experiential learning style, pointing toward applied diplomas or vocational degrees.', reversed:false, safetyQuestion:false },
  { id:44, part:'Part 5: Execution, Operations & Applied Skills', text:'How frequently do you follow the aviation industry, merchant navy, or commercial transportation logistics?', textKn:'ವಿಮಾನಯಾನ ಉದ್ಯಮ, ವ್ಯಾಪಾರಿ ನೌಕಾಪಡೆ ಅಥವಾ ವಾಣಿಜ್ಯ ಸಾರಿಗೆ ಸಾಗಣೆಯನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಅನುಸರಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Interest in commercial aviation, marine engineering, or global supply chains.', reversed:false, safetyQuestion:false },
  { id:45, part:'Part 5: Execution, Operations & Applied Skills', text:'How often do you enjoy providing exceptional customer service and ensuring people feel welcomed and cared for?', textKn:'ಅಸಾಧಾರಣ ಗ್ರಾಹಕ ಸೇವೆ ಒದಗಿಸುವುದನ್ನು ಮತ್ತು ಜನರಿಗೆ ಸ್ವಾಗತ ಹಾಗೂ ಕಾಳಜಿಯ ಅನುಭವ ನೀಡುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'High interpersonal warmth, essential for hotel management and tourism.', reversed:false, safetyQuestion:false },
  { id:46, part:'Part 5: Execution, Operations & Applied Skills', text:'How comfortable are you strictly following complex safety protocols and operational checklists without deviation?', textKn:'ಯಾವುದೇ ವಿಚಲನೆ ಇಲ್ಲದೆ ಸಂಕೀರ್ಣ ಸುರಕ್ಷತಾ ಪ್ರೋಟೋಕಾಲ್‌ಗಳು ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಯ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಗಳನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಅನುಸರಿಸಲು ನೀವು ಎಷ್ಟು ಆರಾಮವಾಗಿರುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Rule-adherence and discipline, crucial for aviation (pilots) and heavy machinery operations.', reversed:false, safetyQuestion:false },
  { id:47, part:'Part 5: Execution, Operations & Applied Skills', text:'How regularly do you experiment with culinary techniques, baking, or the science of food preparation?', textKn:'ಅಡುಗೆ ತಂತ್ರಗಳು, ಬೇಕಿಂಗ್ ಅಥವಾ ಆಹಾರ ತಯಾರಿಕೆಯ ವಿಜ್ಞಾನದೊಂದಿಗೆ ನೀವು ಎಷ್ಟು ನಿಯಮಿತವಾಗಿ ಪ್ರಯೋಗ ಮಾಡುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Passion for culinary arts and food technology.', reversed:false, safetyQuestion:false },
  { id:48, part:'Part 5: Execution, Operations & Applied Skills', text:'How often do you enjoy coordinating complex schedules, managing inventory, or organizing large-scale supplies?', textKn:'ಸಂಕೀರ್ಣ ವೇಳಾಪಟ್ಟಿಗಳನ್ನು ಸಂಯೋಜಿಸುವುದು, ದಾಸ್ತಾನು ನಿರ್ವಹಿಸುವುದು ಅಥವಾ ದೊಡ್ಡ ಪ್ರಮಾಣದ ಸರಬರಾಜುಗಳನ್ನು ಆಯೋಜಿಸುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Supply chain management and operational logistics aptitude.', reversed:false, safetyQuestion:false },
  { id:49, part:'Part 5: Execution, Operations & Applied Skills', text:'How much do you enjoy mastering a specific physical or technical skill until you are the absolute best at it?', textKn:'ನೀವು ಅದರಲ್ಲಿ ಅತ್ಯುತ್ತಮರಾಗುವವರೆಗೆ ಒಂದು ನಿರ್ದಿಷ್ಟ ದೈಹಿಕ ಅಥವಾ ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯವನ್ನು ಕರಗತ ಮಾಡಿಕೊಳ್ಳುವುದನ್ನು ನೀವು ಎಷ್ಟು ಆನಂದಿಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Drive for specialized mastery (e.g., specialized technicians, chefs, pilots).', reversed:false, safetyQuestion:false },
  { id:50, part:'Part 5: Execution, Operations & Applied Skills', text:'How frequently do you prefer careers that offer immediate, tangible results at the end of the workday over long-term abstract projects?', textKn:'ದೀರ್ಘಕಾಲೀನ ಅಮೂರ್ತ ಯೋಜನೆಗಳಿಗಿಂತ ಕೆಲಸದ ದಿನದ ಕೊನೆಯಲ್ಲಿ ತಕ್ಷಣದ, ಸ್ಪಷ್ಟ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುವ ವೃತ್ತಿಗಳನ್ನು ನೀವು ಎಷ್ಟು ಬಾರಿ ಬಯಸುತ್ತೀರಿ?', partKn:'ಭಾಗ 5: ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆ, ಕಾರ್ಯಾಚರಣೆಗಳು ಮತ್ತು ಅನ್ವಯಿಕ ಕೌಶಲ್ಯಗಳು', indicator:'Preference for action-oriented, results-driven professions.', reversed:false, safetyQuestion:false },
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

// ─── Career-fit scoring (10th/12th counselling) ───────────────────────────────
// Follows the PDF's "Scoring & Assessment Guide": the Part with the highest
// concentration of C/D answers indicates the student's dominant aptitude profile.
const CAREER_PROFILES_10TH = {
  1: { title: 'The Analytical / Scientific Mind', color: '#22c55e',
       action: 'Recommended Stream: Science (PCM/PCB). Explore Careers In: Engineering, Data Science, Medicine, Research, Architecture.' },
  2: { title: 'The Creative / Expressive Mind', color: '#e879f9',
       action: 'Recommended Stream: Arts & Humanities. Explore Careers In: Design, Journalism, Literature, Fine Arts, Media, Law.' },
  3: { title: 'The Enterprising / Leadership Mind', color: '#f59e0b',
       action: 'Recommended Stream: Commerce / Business. Explore Careers In: Management, Finance, Entrepreneurship, Marketing, Corporate Law.' },
  4: { title: 'The Empathetic / Social Mind', color: '#0d9488',
       action: 'Recommended Stream: Humanities or Science (PCB). Explore Careers In: Psychology, Healthcare, Teaching, Social Work, Public Policy.' },
  5: { title: 'The Practical / Technical Mind', color: '#3b82f6',
       action: 'Recommended Stream: Science (Computer Science) or Vocational/Diploma Tracks. Explore Careers In: IT/Software, Robotics, Applied Engineering, Digital Media, Skilled Trades.' },
  multipotentialite: { title: 'The Multipotentialite', color: '#a855f7',
       action: 'Recommended Action: Focus on interdisciplinary combinations (e.g., Commerce with Math, Arts with Economics). Encourage shadowing professionals to narrow down practical interests.' },
}

const CAREER_PROFILES_12TH = {
  1: { title: 'The Deep Tech / Analytical Mind', color: '#22c55e',
       action: 'Target Degrees: B.Tech / B.E. (Computer Science, Mechanical, AI), B.Sc. (Physics, Mathematics, Data Science). Action: Focus on entrance exams (JEE, etc.) and build a portfolio of coding or hardware projects.' },
  2: { title: 'The Creative / Design Mind', color: '#e879f9',
       action: 'Target Degrees: B.Arch, B.Des (UI/UX, Product Design), B.A. (Journalism, Mass Comm, Fine Arts). Action: Begin compiling a strong visual portfolio or writing samples. Look into design entrance exams (NID, NIFT, NATA).' },
  3: { title: 'The Enterprise / Strategic Mind', color: '#f59e0b',
       action: 'Target Degrees: BBA, B.Com (Hons), CA / CS / CFA tracks, Integrated Law (BBA LLB). Action: Participate in business case competitions. Research management entrance exams (IPMAT, CUET) or CA foundational courses.' },
  4: { title: 'The Health / Society Mind', color: '#0d9488',
       action: 'Target Degrees: MBBS, BDS, B.Sc. (Psychology, Nursing), B.A. (Political Science, Sociology), BA LLB. Action: Prepare for medical entrances (NEET) or law entrances (CLAT). Consider volunteering with NGOs to build a social work profile.' },
  5: { title: 'The Applied / Operational Mind', color: '#3b82f6',
       action: 'Target Degrees/Certifications: B.Sc. (Hospitality / Hotel Management), Commercial Pilot Training, Culinary Arts, Supply Chain Diplomas. Action: Research specialized training academies rather than traditional universities. Look for immediate internships in the hospitality or operations sector.' },
}

/**
 * Scores the 10th/12th career counselling assessments using the PDF's dominant-part
 * rubric, instead of the mental-health "Healthy Coping / Distress" scale used by calculateResult.
 * @param {Record<number, string>} answers - { questionId: 'A' | 'B' | 'C' | 'D' }
 * @param {string} categoryId - 'counselling-10th' | 'counselling-12th'
 * @returns {{ score: number, total: number, safetyFlag: boolean, level: string, label: string, action: string, color: string }}
 */
export function calculateCareerFitResult(answers, categoryId, questions = QUESTIONS[categoryId]) {
  const optionScore = { A: 1, B: 2, C: 3, D: 4 }
  const partHits = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let score = 0

  questions.forEach((q) => {
    const answer = answers[q.id]
    if (!answer) return

    score += optionScore[answer]

    const partNum = Number(q.part.match(/Part (\d)/)?.[1])
    if (partNum && (answer === 'C' || answer === 'D')) partHits[partNum]++
  })

  const total = questions.length
  const profiles = categoryId === 'counselling-12th' ? CAREER_PROFILES_12TH : CAREER_PROFILES_10TH

  const maxHits = Math.max(...Object.values(partHits))
  const topParts = Object.keys(partHits).filter((n) => partHits[n] === maxHits)

  // Only the 10th-grade guide defines a "Multipotentialite" fallback for an even spread.
  const profile = categoryId !== 'counselling-12th' && topParts.length > 1
    ? profiles.multipotentialite
    : profiles[topParts[0]]

  return {
    score,
    total,
    safetyFlag: false,
    level: 'career',
    label: profile.title,
    action: profile.action,
    color: profile.color,
  }
}
