const HEADER_ROW = 'Player,Team,League,Position,Age,Performance Index,Minutes played,Possessions won per 90,Defensive duels per 90,Aerial duels per 90,Sliding tackles per 90,Sliding tackles (PAdj),Shots blocked per 90,Interceptions per 90,Interceptions (PAdj),Successful attacking actions per 90,Goals per 90,Non-penalty goals per 90,xG per 90,Headed goals per 90,Shots per 90,Assists per 90,Crosses per 90,Crosses to box per 90,Dribbles attempted per 90,Offensive duels per 90,Touches in box per 90,Progressive carries per 90,Accelerations per 90,Fouls suffered per 90,Passes per 90,Forward passes per 90,Short passes per 90,Long passes per 90,Average pass length (m),xA per 90,Shot assists per 90,Key passes per 90,Passes to final third per 90,Passes to penalty box per 90,Through passes per 90,Deep completions per 90,Progressive passes per 90,Shots conceded per 90,Clean sheets,xG conceded per 90,Prevented goals per 90,Exits per 90,Defensive duels won %,Aerial duels won %,Shots on target %,Goal conversion %,Cross accuracy %,Dribble success rate %,Offensive duels won %,Pass completion %,Forward pass completion %,Short pass completion %,Long pass accuracy %,Pass completion (to final third) %,Pass completion (to penalty box) %,Through pass completion %,Progressive pass accuracy %,Save percentage %,Free kicks per 90,Direct free kicks per 90,Direct free kicks oT %,Corners per 90,Penalties attempted,Penalty success rate %,Matches played,Duels per 90,Duels won %,Possession +/-,Forward pass ratio,xA per 100 passes,Chance creation ratio,Inaccurate passes %,Goals + Assists per 90,NPG+A per 90,xG+xA per 90,xG/Shot,Goals - xG per 90,Goals per xG,Assists - xA per 90,Assists per xA,Successful dribbles per 90,Shots on target per 90,Accurate crosses per 90,Offensive duels won per 90,Defensive duels won per 90,Aerial duels won per 90,Passes completed per 90,Forward passes completed per 90,Short passes completed per 90,Long passes completed per 90,Accurate passes to final third per 90,Accurate passes to pen box per 90,Through passes completed per 90,Progressive passes completed per 90,Misplaced passes per 90,Saves per 90,Possessions lost per 90,Possessions won - lost per 90,Progressive actions per 90,Duels won per 90,Minutes per match,Backward pass ratio,Penalties scored,npxG per 90,npxG/Shot,npxG+xA per 90,Touches per 90,Progressive action rate,Progressive passes (PAdj),Ball-carrying frequency,xG per 100 touches,Shot frequency,Dribbles per 100 touches,Goals per 100 touches,Passes received per 90,Backward passes per 90,Pre-assists per 90';

const NON_CONVERTIBLE_COLUMNS = new Set([5, 6, 11, 14, 34, 44, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 66, 68, 69, 70, 72, 73, 74, 75, 76, 81, 83, 85, 106, 107, 108, 110, 113, 114, 115, 116, 117, 118, 119]);
const TWO_DECIMAL_TOTAL = new Set([18, 35, 45, 46, 80, 82, 84, 109, 111]);
const MINMAX_BAR_COLUMNS = new Set([46, 73, 82, 84, 103]);
const GOAL_CONVERSION_INDEX = 51;
const PERFORMANCE_INDEX = 5;
const MINUTES_INDEX = 6;
// PERFORMANCE_INDEX is excluded from the search tool entirely
const VIRTUAL_BUFFER = 12;
const METRIC_A_COLOR = 'rgba(52, 152, 219, 0.9)';
const METRIC_B_COLOR = 'rgba(46, 204, 113, 0.9)';
const MATCH_BAR_COLOR = 'rgba(230, 126, 34, 0.92)';

const INDIVIDUAL_POSITIONS = [
    { value: 'Goalkeeper', i18n: 'positions.goalkeeper', label: 'Goalkeeper' },
    { value: 'Centre-back', i18n: 'positions.centreback', label: 'Centre-back' },
    { value: 'Full-back', i18n: 'positions.fullback', label: 'Full-back' },
    { value: 'Midfielder', i18n: 'positions.midfielder', label: 'Midfielder' },
    { value: 'Winger', i18n: 'positions.winger', label: 'Winger' },
    { value: 'Striker', i18n: 'positions.striker', label: 'Striker' }
];
const ALL_POSITIONS = INDIVIDUAL_POSITIONS.map(position => position.value);

const TOP_5 = ['Premier League', 'Bundesliga', 'La Liga', 'Ligue 1', 'Serie A'];
const TOP_7 = ['Premier League', 'Bundesliga', 'La Liga', 'Ligue 1', 'Serie A', 'Eredivisie', 'Liga Portugal'];
const SECOND_DIVISIONS = ['Championship', 'Segunda Division', 'Serie B', 'Bundesliga 2', 'Ligue 2', 'Liga Portugal 2', 'Eerste Divisie'];
const SOUTH_AMERICA = ['Brazil Serie A', 'Argentina Primera', 'Uruguay Primera', 'Colombia', 'Chile', 'Paraguay', 'Ecuador'];
const SCANDINAVIA = ['Norway Eliteserien', 'Denmark Superliga', 'Sweden Allsvenskan'];
const EASTERN_EUROPE = ['Czech Fortuna Liga', 'Serbia SuperLiga', 'Croatia HNL', 'Russia', 'Ukraine', 'Poland', 'Slovenia', 'Romania', 'Bulgaria', 'Hungary', 'Slovakia'];
const GULF = ['Saudi Pro League', 'UAE', 'Qatar'];
const AFRICA = ['South Africa', 'Egypt', 'Morocco'];
const ALL_LEAGUES = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Liga Portugal', 'Eredivisie', 'Belgium Pro League', 'Scotland Premiership', 'Austrian Bundesliga', 'Swiss Super League', 'Süper Lig', 'Denmark Superliga', 'Sweden Allsvenskan', 'Norway Eliteserien', 'Ukraine', 'Russia', 'Poland', 'Croatia HNL', 'Serbia SuperLiga', 'Czech Fortuna Liga', 'Bulgaria', 'Hungary', 'Slovakia', 'Slovenia', 'Romania', 'Greece', 'Cyprus', 'Israel', 'Saudi Pro League', 'UAE', 'Qatar', 'J1 League', 'K League 1', 'MLS', 'LigaMX', 'Brazil Serie A', 'Argentina Primera', 'Uruguay Primera', 'Chile', 'Colombia', 'Ecuador', 'Paraguay', 'Egypt', 'Morocco', 'South Africa', 'Australia', 'Championship', 'Segunda Division', 'Serie B', 'Bundesliga 2', 'Ligue 2', 'Eerste Divisie', 'Liga Portugal 2', 'League One'];
const FIRST_DIVISIONS = ALL_LEAGUES.filter(league => !SECOND_DIVISIONS.includes(league) && league !== 'League One');
const NO_TOP_7 = ALL_LEAGUES.filter(league => !TOP_7.includes(league));

const INDIVIDUAL_LEAGUES = [
    { value: 'Premier League', i18n: 'leagues.premierLeague', icon: 'emojione:flag-for-united-kingdom', label: 'Premier League' },
    { value: 'La Liga', i18n: 'leagues.laLiga', icon: 'emojione:flag-for-spain', label: 'La Liga' },
    { value: 'Bundesliga', i18n: 'leagues.bundesliga', icon: 'emojione:flag-for-germany', label: 'Bundesliga' },
    { value: 'Serie A', i18n: 'leagues.serieA', icon: 'emojione:flag-for-italy', label: 'Serie A' },
    { value: 'Ligue 1', i18n: 'leagues.ligue1', icon: 'emojione:flag-for-france', label: 'Ligue 1' },
    { value: 'Liga Portugal', i18n: 'leagues.ligaPortugal', icon: 'emojione:flag-for-portugal', label: 'Liga Portugal' },
    { value: 'Eredivisie', i18n: 'leagues.eredivisie', icon: 'emojione:flag-for-netherlands', label: 'Eredivisie' },
    { value: 'Belgium Pro League', i18n: 'leagues.belgium', icon: 'emojione:flag-for-belgium', label: 'Belgium' },
    { value: 'Scotland Premiership', i18n: 'leagues.scotland', icon: '', label: 'Scotland', scotland: true },
    { value: 'Austrian Bundesliga', i18n: 'leagues.austria', icon: 'emojione:flag-for-austria', label: 'Austria' },
    { value: 'Swiss Super League', i18n: 'leagues.switzerland', icon: 'emojione:flag-for-switzerland', label: 'Switzerland' },
    { value: 'Süper Lig', i18n: 'leagues.turkey', icon: 'emojione:flag-for-turkey', label: 'Türkiye' },
    { value: 'Denmark Superliga', i18n: 'leagues.denmark', icon: 'emojione:flag-for-denmark', label: 'Denmark' },
    { value: 'Sweden Allsvenskan', i18n: 'leagues.sweden', icon: 'emojione:flag-for-sweden', label: 'Sweden' },
    { value: 'Norway Eliteserien', i18n: 'leagues.norway', icon: 'emojione:flag-for-norway', label: 'Norway' },
    { value: 'Ukraine', i18n: 'leagues.ukraine', icon: 'emojione:flag-for-ukraine', label: 'Ukraine' },
    { value: 'Russia', i18n: 'leagues.russia', icon: 'emojione:flag-for-russia', label: 'Russia' },
    { value: 'Poland', i18n: 'leagues.poland', icon: 'emojione:flag-for-poland', label: 'Poland' },
    { value: 'Croatia HNL', i18n: 'leagues.croatia', icon: 'emojione:flag-for-croatia', label: 'Croatia' },
    { value: 'Serbia SuperLiga', i18n: 'leagues.serbia', icon: 'emojione:flag-for-serbia', label: 'Serbia' },
    { value: 'Czech Fortuna Liga', i18n: 'leagues.czech', icon: 'emojione:flag-for-czechia', label: 'Czech Republic' },
    { value: 'Bulgaria', i18n: 'leagues.bulgaria', icon: 'emojione:flag-for-bulgaria', label: 'Bulgaria' },
    { value: 'Hungary', i18n: 'leagues.hungary', icon: 'emojione:flag-for-hungary', label: 'Hungary' },
    { value: 'Slovakia', i18n: 'leagues.slovakia', icon: 'emojione:flag-for-slovakia', label: 'Slovakia' },
    { value: 'Slovenia', i18n: 'leagues.slovenia', icon: 'emojione:flag-for-slovenia', label: 'Slovenia' },
    { value: 'Romania', i18n: 'leagues.romania', icon: 'emojione:flag-for-romania', label: 'Romania' },
    { value: 'Greece', i18n: 'leagues.greece', icon: 'emojione:flag-for-greece', label: 'Greece' },
    { value: 'Cyprus', i18n: 'leagues.cyprus', icon: 'emojione:flag-for-cyprus', label: 'Cyprus' },
    { value: 'Israel', i18n: 'leagues.israel', icon: 'emojione:flag-for-israel', label: 'Israel' },
    { value: 'Saudi Pro League', i18n: 'leagues.saudiArabia', icon: 'emojione:flag-for-saudi-arabia', label: 'Saudi Arabia' },
    { value: 'UAE', i18n: 'leagues.uae', icon: 'emojione:flag-for-united-arab-emirates', label: 'UAE' },
    { value: 'Qatar', i18n: 'leagues.qatar', icon: 'emojione:flag-for-qatar', label: 'Qatar' },
    { value: 'J1 League', i18n: 'leagues.japan', icon: 'emojione:flag-for-japan', label: 'Japan' },
    { value: 'K League 1', i18n: 'leagues.korea', icon: 'emojione:flag-for-south-korea', label: 'Korea' },
    { value: 'MLS', i18n: 'leagues.usa', icon: 'emojione:flag-for-united-states', label: 'MLS' },
    { value: 'LigaMX', i18n: 'leagues.mexico', icon: 'emojione:flag-for-mexico', label: 'Mexico' },
    { value: 'Brazil Serie A', i18n: 'leagues.brazil', icon: 'emojione:flag-for-brazil', label: 'Brazil Serie A' },
    { value: 'Argentina Primera', i18n: 'leagues.argentina', icon: 'emojione:flag-for-argentina', label: 'Argentina Primera' },
    { value: 'Uruguay Primera', i18n: 'leagues.uruguay', icon: 'emojione:flag-for-uruguay', label: 'Uruguay Primera' },
    { value: 'Chile', i18n: 'leagues.chile', icon: 'emojione:flag-for-chile', label: 'Chile' },
    { value: 'Colombia', i18n: 'leagues.colombia', icon: 'emojione:flag-for-colombia', label: 'Colombia' },
    { value: 'Ecuador', i18n: 'leagues.ecuador', icon: 'emojione:flag-for-ecuador', label: 'Ecuador' },
    { value: 'Paraguay', i18n: 'leagues.paraguay', icon: 'emojione:flag-for-paraguay', label: 'Paraguay' },
    { value: 'Egypt', i18n: 'leagues.egypt', icon: 'emojione:flag-for-egypt', label: 'Egypt' },
    { value: 'Morocco', i18n: 'leagues.morocco', icon: 'emojione:flag-for-morocco', label: 'Morocco' },
    { value: 'South Africa', i18n: 'leagues.southAfrica', icon: 'emojione:flag-for-south-africa', label: 'South Africa' },
    { value: 'Australia', i18n: 'leagues.australia', icon: 'emojione:flag-for-australia', label: 'Australia' },
    { value: 'Championship', i18n: 'leagues.championship', icon: 'emojione:flag-for-united-kingdom', label: 'Championship' },
    { value: 'Segunda Division', i18n: 'leagues.segundaDivision', icon: 'emojione:flag-for-spain', label: 'Spain Segunda' },
    { value: 'Serie B', i18n: 'leagues.serieB', icon: 'emojione:flag-for-italy', label: 'Serie B' },
    { value: 'Bundesliga 2', i18n: 'leagues.bundesliga2', icon: 'emojione:flag-for-germany', label: '2. Bundesliga' },
    { value: 'Ligue 2', i18n: 'leagues.ligue2', icon: 'emojione:flag-for-france', label: 'Ligue 2' },
    { value: 'Eerste Divisie', i18n: 'leagues.eersteDivisie', icon: 'emojione:flag-for-netherlands', label: 'Eerste Divisie' },
    { value: 'Liga Portugal 2', i18n: 'leagues.ligaPortugal2', icon: 'emojione:flag-for-portugal', label: 'Liga Portugal 2' },
    { value: 'League One', i18n: 'leagues.leagueOne', icon: 'emojione:flag-for-united-kingdom', label: 'League One' }
];

const LEAGUE_PRESETS = [
    { value: 'All Leagues', i18n: 'leagues.allLeagues', icon: 'emojione:globe-showing-europe-africa', label: 'All Leagues', leagues: ALL_LEAGUES },
    { value: 'All First Divisions', i18n: 'leagues.firstDivisions', icon: 'emojione:globe-showing-europe-africa', label: 'All First Divisions', leagues: FIRST_DIVISIONS },
    { value: 'Top 7 Leagues', i18n: 'leagues.top7', icon: 'emojione:flag-for-flag-european-union', label: 'Top 7 Leagues', leagues: TOP_7 },
    { value: 'Top 5 Leagues', i18n: 'leagues.top5', icon: 'emojione:flag-for-flag-european-union', label: 'Top 5 Leagues', leagues: TOP_5 },
    { value: 'No Top 7', i18n: 'leagues.noTop7', icon: 'emojione:globe-showing-europe-africa', label: 'Outside Top 7', leagues: NO_TOP_7 },
    { value: 'South America', i18n: 'leagues.southAmerica', icon: 'emojione:globe-showing-americas', label: 'South America', leagues: SOUTH_AMERICA },
    { value: 'Scandinavia', i18n: 'leagues.scandinavia', icon: 'emojione:globe-showing-europe-africa', label: 'Scandinavia', leagues: SCANDINAVIA },
    { value: 'Eastern Europe', i18n: 'leagues.easternEurope', icon: 'emojione:globe-showing-europe-africa', label: 'Eastern Europe', leagues: EASTERN_EUROPE },
    { value: 'Gulf', i18n: 'leagues.gulf', icon: 'emojione:globe-showing-asia-australia', label: 'Gulf', leagues: GULF },
    { value: 'Africa', i18n: 'leagues.africa', icon: 'emojione:globe-showing-europe-africa', label: 'Africa', leagues: AFRICA },
    { value: '2nd Divisions', i18n: 'leagues.2ndDivisions', icon: 'emojione:globe-showing-europe-africa', label: '2nd Divisions', leagues: SECOND_DIVISIONS }
];

const customMetricOrder = [
    { text: "Minutes played", i18n: "metrics.minutesPlayed" },
    { text: "Matches played", i18n: "metrics.matchesPlayed" },
    { text: "Minutes per match", i18n: "metrics.minutesPerMatch" },
    { text: "CATEGORY: Defending", i18n: "categories.defending" },
    { text: "Defensive duels per 90", i18n: "metrics.defensiveDuels" },
    { text: "Defensive duels won %", i18n: "metrics.defensiveDuelsWon" },
    { text: "Defensive duels won per 90", i18n: "metrics.defensiveDuelsWonPerNinety" },
    { text: "Sliding tackles per 90", i18n: "metrics.slidingTackles" },
    { text: "Sliding tackles (PAdj)", i18n: "metrics.slidingTacklesAdj" },
    { text: "Interceptions per 90", i18n: "metrics.interceptions" },
    { text: "Interceptions (PAdj)", i18n: "metrics.interceptionsAdj" },
    { text: "Possessions won per 90", i18n: "metrics.possessionsWon" },
    { text: "Aerial duels per 90", i18n: "metrics.aerialDuels" },
    { text: "Aerial duels won %", i18n: "metrics.aerialDuelsWon" },
    { text: "Aerial duels won per 90", i18n: "metrics.aerialDuelsWonPerNinety" },
    { text: "Shots blocked per 90", i18n: "metrics.shotsBlocked" },
    { text: "CATEGORY: Passing", i18n: "categories.passing" },
    { text: "Passes per 90", i18n: "metrics.passes" },
    { text: "Pass completion %", i18n: "metrics.passCompletion" },
    { text: "Passes completed per 90", i18n: "metrics.passesCompleted" },
    { text: "Forward passes per 90", i18n: "metrics.forwardPasses" },
    { text: "Forward pass completion %", i18n: "metrics.forwardPassCompletion" },
    { text: "Forward passes completed per 90", i18n: "metrics.forwardPassesCompleted" },
    { text: "Short passes per 90", i18n: "metrics.shortPasses" },
    { text: "Short pass completion %", i18n: "metrics.shortPassCompletion" },
    { text: "Short passes completed per 90", i18n: "metrics.shortPassesCompleted" },
    { text: "Long passes per 90", i18n: "metrics.longPasses" },
    { text: "Long pass accuracy %", i18n: "metrics.longPassAccuracy" },
    { text: "Long passes completed per 90", i18n: "metrics.longPassesCompleted" },
    { text: "Progressive passes per 90", i18n: "metrics.progressivePasses" },
    { text: "Progressive pass accuracy %", i18n: "metrics.progressivePassAccuracy" },
    { text: "Progressive passes completed per 90", i18n: "metrics.progressivePassesCompleted" },
    { text: "Progressive passes (PAdj)", i18n: "metrics.progressivePassesAdj" },
    { text: "Passes to final third per 90", i18n: "metrics.passesToFinalThird" },
    { text: "Pass completion (to final third) %", i18n: "metrics.passCompletionFinalThird" },
    { text: "Accurate passes to final third per 90", i18n: "metrics.accuratePassesFinalThird" },
    { text: "Passes to penalty box per 90", i18n: "metrics.passesToBox" },
    { text: "Pass completion (to penalty box) %", i18n: "metrics.passCompletionToBox" },
    { text: "Accurate passes to pen box per 90", i18n: "metrics.accuratePassesToBox" },
    { text: "Through passes per 90", i18n: "metrics.throughPasses" },
    { text: "Through pass completion %", i18n: "metrics.throughPassCompletion" },
    { text: "Through passes completed per 90", i18n: "metrics.throughPassesCompleted" },
    { text: "Average pass length (m)", i18n: "metrics.averagePassLength" },
    { text: "Forward pass ratio", i18n: "metrics.forwardPassRatio" },
    { text: "CATEGORY: Possession", i18n: "categories.possession" },
    { text: "Passes received per 90", i18n: "metrics.passesReceived" },
    { text: "Touches per 90", i18n: "metrics.touches" },
    { text: "Possessions won - lost per 90", i18n: "metrics.possessionsBalance" },
    { text: "Possession +/-", i18n: "metrics.possessionPlusMinus" },
    { text: "Duels per 90", i18n: "metrics.duels" },
    { text: "Duels won %", i18n: "metrics.duelsWon" },
    { text: "Duels won per 90", i18n: "metrics.duelsWonPerNinety" },
    { text: "Progressive actions per 90", i18n: "metrics.progressiveActions" },
    { text: "Progressive action rate", i18n: "metrics.progressiveActionRate" },
    { text: "CATEGORY: Dribbling and Ball-Carrying", i18n: "categories.dribbling" },
    { text: "Dribbles attempted per 90", i18n: "metrics.dribblesAttempted" },
    { text: "Dribble success rate %", i18n: "metrics.dribbleSuccess" },
    { text: "Successful dribbles per 90", i18n: "metrics.successfulDribbles" },
    { text: "Dribbles per 100 touches", i18n: "metrics.dribblesPerTouches" },
    { text: "Successful attacking actions per 90", i18n: "metrics.attackingActions" },
    { text: "Offensive duels per 90", i18n: "metrics.offensiveDuels" },
    { text: "Offensive duels won %", i18n: "metrics.offensiveDuelsWon" },
    { text: "Offensive duels won per 90", i18n: "metrics.offensiveDuelsWonPerNinety" },
    { text: "Progressive carries per 90", i18n: "metrics.progressiveCarries" },
    { text: "Ball-carrying frequency", i18n: "metrics.ballCarrying" },
    { text: "Accelerations per 90", i18n: "metrics.accelerations" },
    { text: "Fouls suffered per 90", i18n: "metrics.foulsSuffered" },
    { text: "CATEGORY: Goal Creation", i18n: "categories.goalCreation" },
    { text: "Assists per 90", i18n: "metrics.assistsPerNinety" },
    { text: "xA per 90", i18n: "metrics.xaPerNinety" },
    { text: "xA per 100 passes", i18n: "metrics.xaPerPasses" },
    { text: "Goals + Assists per 90", i18n: "metrics.goalsAndAssists" },
    { text: "NPG+A per 90", i18n: "metrics.npGoalsAndAssists" },
    { text: "xG+xA per 90", i18n: "metrics.xgAndXa" },
    { text: "npxG+xA per 90", i18n: "metrics.npxgAndXa" },
    { text: "Key passes per 90", i18n: "metrics.keyPasses" },
    { text: "Chance creation ratio", i18n: "metrics.chanceCreation" },
    { text: "Assists - xA per 90", i18n: "metrics.assistsMinusXa" },
    { text: "Assists per xA", i18n: "metrics.assistsPerXa" },
    { text: "Shot assists per 90", i18n: "metrics.shotAssists" },
    { text: "Pre-assists per 90", i18n: "metrics.preAssists" },
    { text: "Crosses per 90", i18n: "metrics.crosses" },
    { text: "Cross accuracy %", i18n: "metrics.crossAccuracy" },
    { text: "Accurate crosses per 90", i18n: "metrics.accurateCrosses" },
    { text: "Crosses to box per 90", i18n: "metrics.crossesToBox" },
    { text: "Deep completions per 90", i18n: "metrics.deepCompletions" },
    { text: "CATEGORY: Goal Scoring", i18n: "categories.goalScoring" },
    { text: "Goals per 90", i18n: "metrics.goalsPerNinety" },
    { text: "Non-penalty goals per 90", i18n: "metrics.nonPenaltyGoals" },
    { text: "xG per 90", i18n: "metrics.xgPerNinety" },
    { text: "xG/Shot", i18n: "metrics.xgPerShot" },
    { text: "npxG per 90", i18n: "metrics.npxgPerNinety" },
    { text: "npxG/Shot", i18n: "metrics.npxgPerShot" },
    { text: "Goals per 100 touches", i18n: "metrics.goalsPerTouches" },
    { text: "xG per 100 touches", i18n: "metrics.xgPerTouches" },
    { text: "Shot frequency", i18n: "metrics.shotFrequency" },
    { text: "Shots per 90", i18n: "metrics.shotsPerNinety" },
    { text: "Shots on target %", i18n: "metrics.shotsOnTarget" },
    { text: "Shots on target per 90", i18n: "metrics.shotsOnTargetPerNinety" },
    { text: "Goal conversion %", i18n: "metrics.goalConversion" },
    { text: "Goals - xG per 90", i18n: "metrics.goalsMinusXg" },
    { text: "Goals per xG", i18n: "metrics.goalsPerXg" },
    { text: "Headed goals per 90", i18n: "metrics.headedGoals" },
    { text: "Touches in box per 90", i18n: "metrics.touchesInBox" },
    { text: "CATEGORY: Goalkeeping", i18n: "categories.goalkeeping" },
    { text: "Saves per 90", i18n: "metrics.saves" },
    { text: "Save percentage %", i18n: "metrics.savePercentage" },
    { text: "Prevented goals per 90", i18n: "metrics.preventedGoals" },
    { text: "Shots conceded per 90", i18n: "metrics.shotsConceded" },
    { text: "xG conceded per 90", i18n: "metrics.xgConceded" },
    { text: "Clean sheets", i18n: "metrics.cleanSheets" },
    { text: "Exits per 90", i18n: "metrics.exits" },
    { text: "CATEGORY: Set Pieces", i18n: "categories.setPieces" },
    { text: "Free kicks per 90", i18n: "metrics.freeKicks" },
    { text: "Direct free kicks per 90", i18n: "metrics.directFreeKicks" },
    { text: "Direct free kicks oT %", i18n: "metrics.directFreeKicksOnTarget" },
    { text: "Corners per 90", i18n: "metrics.corners" },
    { text: "Penalties attempted", i18n: "metrics.penaltiesAttempted" },
    { text: "Penalties scored", i18n: "metrics.penaltiesScored" },
    { text: "Penalty success rate %", i18n: "metrics.penaltySuccessRate" }
];

const MATCHES_INDEX = 70;
const AGE_INDEX = 4;
const FILTER_SKIP = new Set([MINUTES_INDEX, PERFORMANCE_INDEX]);

let isPastSeason = false;

const columnIndexMap = {};
HEADER_ROW.split(',').forEach((name, index) => {
    columnIndexMap[name] = index;
});

const RADAR_BY_POSITION = {
    Goalkeeper: ['Save percentage %', 'Aerial duels won per 90', 'Interceptions (PAdj)', 'Passes completed per 90', 'Long pass accuracy %', 'Short pass completion %', 'Prevented goals per 90'],
    'Centre-back': ['Passes completed per 90', 'Forward pass completion %', 'Progressive passes completed per 90', 'Possessions won per 90', 'Defensive duels won %', 'Aerial duels won %', 'Progressive carries per 90'],
    'Full-back': ['Accurate crosses per 90', 'xA per 90', 'Progressive passes completed per 90', 'Possessions won per 90', 'Defensive duels won %', 'Aerial duels won %', 'Progressive carries per 90'],
    Midfielder: ['Duels won %', 'Possessions won per 90', 'Progressive carries per 90', 'Forward passes completed per 90', 'Forward pass completion %', 'Key passes per 90', 'Progressive passes completed per 90'],
    Winger: ['Progressive carries per 90', 'Successful dribbles per 90', 'Non-penalty goals per 90', 'npxG+xA per 90', 'Assists per 90', 'Key passes per 90', 'Accurate crosses per 90'],
    Striker: ['Non-penalty goals per 90', 'npxG per 90', 'Goal conversion %', 'Aerial duels won %', 'Touches in box per 90', 'xA per 90', 'Offensive duels won per 90']
};

const ALL_POSITION_METRICS = ['Progressive actions per 90', 'Possessions won per 90', 'Pass completion %', 'Duels won %', 'Goals per 90', 'Assists per 90', 'xG+xA per 90'];

const TEMPLATES = [
    { id: 'default', i18n: 'templates.default', label: 'Default' },
    { id: 'defending', i18n: 'templates.defending', label: 'Defending', names: [
        'Defensive duels won %', 'Defensive duels won per 90', 'Sliding tackles per 90',
        'Interceptions per 90', 'Possessions won per 90', 'Aerial duels won %', 'Aerial duels won per 90'
    ] },
    { id: 'passing', i18n: 'templates.passing', label: 'Passing', names: [
        'Pass completion %', 'Passes completed per 90', 'Forward pass completion %',
        'Forward passes completed per 90', 'Short pass completion %', 'Short passes completed per 90',
        'Long pass accuracy %', 'Long passes completed per 90', 'Progressive passes per 90',
        'Progressive pass accuracy %', 'Progressive passes (PAdj)', 'Passes to final third per 90',
        'Passes to penalty box per 90', 'Through passes per 90', 'Key passes per 90', 'Forward pass ratio'
    ] },
    { id: 'carrying', i18n: 'templates.carrying', label: 'Carrying', names: [
        'Dribble success rate %', 'Successful dribbles per 90', 'Dribbles per 100 touches',
        'Successful attacking actions per 90', 'Offensive duels won %', 'Offensive duels won per 90',
        'Progressive carries per 90', 'Ball-carrying frequency', 'Accelerations per 90'
    ] },
    { id: 'creativity', i18n: 'templates.creativity', label: 'Creativity', names: [
        'Passes to penalty box per 90', 'Through passes per 90', 'Progressive actions per 90',
        'Assists per 90', 'xA per 90', 'Key passes per 90', 'Shot assists per 90', 'Crosses per 90'
    ] },
    { id: 'output', i18n: 'templates.output', label: 'Output', names: [
        'Goals + Assists per 90', 'Non-penalty goals per 90', 'xG per 90', 'Goals per 100 touches',
        'xG per 100 touches', 'Shots on target per 90', 'Goal conversion %', 'Goals - xG per 90'
    ] },
    { id: 'goalkeeping', i18n: 'templates.goalkeeping', label: 'Goalkeeping', names: [
        'Saves per 90', 'Save percentage %', 'Prevented goals per 90', 'Shots conceded per 90',
        'xG conceded per 90', 'Clean sheets', 'Exits per 90'
    ] }
];

const QUICK_SEARCHES = [
    {
        id: 'u21ShotStopper', i18n: 'archetypes.u21ShotStopper', label: 'U21 Shot-stopper',
        positions: ['Goalkeeper'], age: [15, 21], leagues: ALL_LEAGUES,
        metrics: {
            'Saves per 90': 50,
            'Save percentage %': 75,
            'Prevented goals per 90': 75,
            'Clean sheets': 50
        }
    },
    {
        id: 'sweeperKeeperTop7', i18n: 'archetypes.sweeperKeeperTop7', label: 'Sweeper-keeper (Top 7)',
        positions: ['Goalkeeper'], age: [15, 45], leagues: TOP_7,
        metrics: {
            'Duels per 90': 50,
            'Passes received per 90': 75,
            'Interceptions per 90': 50,
            'Passes completed per 90': 75,
            'Save percentage %': 50,
            'Exits per 90': 50
        }
    },
    {
        id: 'ballPlayingCBTop7', i18n: 'archetypes.ballPlayingCBTop7', label: 'Ball-playing CB (Top 7)',
        positions: ['Centre-back'], age: [15, 45], leagues: TOP_7,
        metrics: {
            'Defensive duels won %': 40,
            'Aerial duels won %': 40,
            'Passes per 90': 75,
            'Forward pass completion %': 50,
            'Progressive passes per 90': 75,
            'Possession +/-': 75,
            'Successful dribbles per 90': 25,
            'Progressive carries per 90': 75
        }
    },
    {
        id: 'experiencedDestroyer', i18n: 'archetypes.experiencedDestroyer', label: 'Experienced destroyer',
        positions: ['Centre-back'], age: [29, 45], leagues: FIRST_DIVISIONS,
        metrics: {
            'Headed goals per 90': 50,
            'Possessions won - lost per 90': 50,
            'Long passes completed per 90': 50,
            'Forward pass ratio': 50,
            'Defensive duels per 90': 50,
            'Defensive duels won %': 50,
            'Sliding tackles (PAdj)': 50,
            'Interceptions (PAdj)': 50,
            'Aerial duels per 90': 50,
            'Aerial duels won %': 50
        }
    },
    {
        id: 'u21WingBack', i18n: 'archetypes.u21WingBack', label: 'U21 Wing-back',
        positions: ['Full-back'], age: [15, 21], leagues: ALL_LEAGUES,
        metrics: {
            'Duels won %': 30,
            'Assists per 90': 70,
            'npxG+xA per 90': 70,
            'Key passes per 90': 70,
            'Crosses per 90': 70,
            'Successful dribbles per 90': 70,
            'Offensive duels per 90': 70,
            'Progressive carries per 90': 70
        }
    },
    {
        id: 'u23DefenderTop5', i18n: 'archetypes.u23DefenderTop5', label: 'U23 Defender (Top 5)',
        positions: ['Centre-back', 'Full-back'], age: [15, 23], leagues: TOP_5,
        metrics: {
            'Progressive actions per 90': 40,
            'Defensive duels won %': 60,
            'Possessions won per 90': 40,
            'Aerial duels won %': 60
        }
    },
    {
        id: 'boxToBoxTop7', i18n: 'archetypes.boxToBoxTop7', label: 'Box-to-box (Top 7)',
        positions: ['Midfielder'], age: [15, 45], leagues: TOP_7,
        metrics: {
            'Possessions won per 90': 50,
            'Aerial duels per 90': 50,
            'Pass completion %': 50,
            'Duels won per 90': 50,
            'Progressive actions per 90': 50,
            'NPG+A per 90': 50,
            'xG per 90': 50
        }
    },
    {
        id: 'u21DeepLyingPlaymaker', i18n: 'archetypes.u21DeepLyingPlaymaker', label: 'U21 Deep-lying playmaker',
        positions: ['Midfielder'], age: [15, 21], leagues: ALL_LEAGUES,
        metrics: {
            'Defensive duels won %': 40,
            'Interceptions per 90': 40,
            'Possession +/-': 75,
            'Progressive carries per 90': 40,
            'Pass completion %': 75,
            'Forward passes per 90': 75,
            'Progressive passes per 90': 75
        }
    },
    {
        id: 'u23AdvancedPlaymakerTop7', i18n: 'archetypes.u23AdvancedPlaymakerTop7', label: 'U23 Advanced playmaker (Top 7)',
        positions: ['Midfielder'], age: [15, 23], leagues: TOP_7,
        metrics: {
            'Non-penalty goals per 90': 75,
            'Assists per 90': 75,
            'npxG+xA per 90': 75,
            'Key passes per 90': 75,
            'Shot assists per 90': 75,
            'Progressive passes per 90': 30,
            'Through passes per 90': 30,
            'Progressive carries per 90': 6
        }
    },
    {
        id: 'u21TraditionalWinger', i18n: 'archetypes.u21TraditionalWinger', label: 'U21 Traditional winger',
        positions: ['Winger'], age: [15, 21], leagues: ALL_LEAGUES,
        metrics: {
            'Duels won per 90': 75,
            'Successful dribbles per 90': 75,
            'Progressive carries per 90': 75,
            'Assists per 90': 75,
            'Accurate crosses per 90': 75,
            'Key passes per 90': 75,
            'Shot assists per 90': 75,
            'npxG+xA per 90': 75
        }
    },
    {
        id: 'insideForwardTop5', i18n: 'archetypes.insideForwardTop5', label: 'Inside forward (Top 5)',
        positions: ['Winger'], age: [15, 45], leagues: TOP_5,
        metrics: {
            'Non-penalty goals per 90': 70,
            'npxG per 90': 70,
            'Shot frequency': 50,
            'Goal conversion %': 50,
            'Assists per 90': 70,
            'xA per 90': 70,
            'Key passes per 90': 70
        }
    },
    {
        id: 'false9', i18n: 'archetypes.false9', label: 'False 9',
        positions: ['Striker'], age: [15, 45], leagues: ALL_LEAGUES,
        metrics: {
            'Passes to penalty box per 90': 75,
            'Progressive actions per 90': 75,
            'Successful attacking actions per 90': 75,
            'Assists per 90': 75,
            'Shot assists per 90': 75,
            'xA per 90': 75,
            'Non-penalty goals per 90': 50,
            'Touches in box per 90': 75
        }
    },
    {
        id: 'u19Goalscorer', i18n: 'archetypes.u19Goalscorer', label: 'U19 Goalscorer',
        positions: ['Winger', 'Striker'], age: [15, 19], leagues: ALL_LEAGUES,
        metrics: {
            'Goals per 90': 80,
            'xG per 90': 60,
            'Goals per 100 touches': 75,
            'Goal conversion %': 70,
            'Goals - xG per 90': 70
        }
    },
    {
        id: 'bestYoungPassers', i18n: 'archetypes.bestYoungPassers', label: 'Best U19 Passers',
        positions: ALL_POSITIONS.slice(), age: [15, 19], leagues: ALL_LEAGUES,
        metrics: {
            'Pass completion %': 80,
            'Passes completed per 90': 80,
            'Forward passes per 90': 80,
            'Forward pass completion %': 80,
            'Progressive passes per 90': 80,
            'Passes to final third per 90': 80,
            'Through passes per 90': 30,
            'Key passes per 90': 30
        }
    },
    {
        id: 'bestCreators', i18n: 'archetypes.bestCreators', label: 'Best creators',
        positions: ['Midfielder', 'Winger'], age: [15, 45], leagues: ALL_LEAGUES,
        metrics: {
            'Key passes per 90': 90,
            'Shot assists per 90': 90,
            'Assists per 90': 90,
            'xA per 90': 90,
            'Through passes per 90': 50,
            'Progressive actions per 90': 90,
            'Pass completion %': 50
        }
    }
];

const IDENTITY_COLUMNS = [
    { key: 'player', index: 0, i18n: 'columns.player', label: 'Player' },
    { key: 'team', index: 1, i18n: 'columns.team', label: 'Team' },
    { key: 'age', index: 4, i18n: 'columns.age', label: 'Age' },
    { key: 'minutes', index: 6, i18n: 'columns.minutes', label: 'Minutes' }
];

let originalDataArray = [];
let selectedLeagues = new Set(ALL_LEAGUES);
let selectedPositions = new Set(['Goalkeeper']);
let selectedMetricIndexes = [];
let metricThresholds = {};
let asTotal = false;
let asPercentile = true;
let currentTemplate = 'default';
let usingRadarDefaults = true;
let sortKey = 'minutes';
let sortDir = 'desc';
let lastResults = [];
let expandedKeys = new Set();
let dataReady = false;
let metricFloor = {};
let searchTimer = 0;
let searchRaf = 0;
let playerTimer = 0;
let hasPaintedResults = false;

function scheduleSearch(opts) {
    opts = opts || {};
    if (!dataReady) return;
    const delay = opts.immediate ? 0 : (opts.delay != null ? opts.delay : 90);
    clearTimeout(searchTimer);
    if (searchRaf) {
        cancelAnimationFrame(searchRaf);
        searchRaf = 0;
    }
    const fire = function () {
        searchRaf = requestAnimationFrame(function () {
            searchRaf = 0;
            const first = !hasPaintedResults;
            runSearch({
                reveal: first,
                syncAutoExpand: true
            });
            hasPaintedResults = true;
        });
    };
    if (!delay) fire();
    else searchTimer = setTimeout(fire, delay);
}

function t(key, fallback) {
    if (typeof getTranslatedText === 'function') {
        const value = getTranslatedText(key, fallback);
        if (value) return value;
    }
    return fallback;
}

function setsEqual(a, b) {
    if (a.size !== b.size) return false;
    for (const value of a) {
        if (!b.has(value)) return false;
    }
    return true;
}

function namesToIndexes(names) {
    const indexes = [];
    names.forEach(name => {
        const index = columnIndexMap[name];
        if (index !== undefined && !FILTER_SKIP.has(index)) indexes.push(index);
    });
    return sortMetricsBySelectorOrder(indexes);
}

function sortMetricsBySelectorOrder(indexes) {
    const order = new Map();
    let rank = 0;
    customMetricOrder.forEach(metric => {
        if (metric.text.startsWith('CATEGORY: ')) return;
        const index = columnIndexMap[metric.text];
        if (index === undefined || FILTER_SKIP.has(index)) return;
        order.set(index, rank++);
    });
    return indexes.slice().sort((a, b) => {
        const aa = order.has(a) ? order.get(a) : 9999;
        const bb = order.has(b) ? order.get(b) : 9999;
        return aa - bb;
    });
}

function radarMetricsForSelection() {
    if (selectedPositions.size !== 1) return namesToIndexes(ALL_POSITION_METRICS);
    const position = selectedPositions.values().next().value;
    return namesToIndexes(RADAR_BY_POSITION[position] || ALL_POSITION_METRICS);
}

function columnCanConvert(index) {
    return index > 4 && !NON_CONVERTIBLE_COLUMNS.has(index);
}

function getMetricValue(row, colIndex, total) {
    const raw = parseFloat(row[colIndex]);
    if (!Number.isFinite(raw)) return NaN;
    if (!total || !columnCanConvert(colIndex)) return raw;
    const minutes = parseFloat(row[MINUTES_INDEX]);
    if (!minutes) return NaN;
    return raw * minutes / 90;
}

function formatMetricValue(value, colIndex, total) {
    if (!Number.isFinite(value)) return '—';
    if (colIndex === GOAL_CONVERSION_INDEX) return value.toFixed(2);
    if (total) {
        if (TWO_DECIMAL_TOTAL.has(colIndex)) return value.toFixed(2);
        return String(Math.round(value));
    }
    if (Number.isInteger(value)) return String(value);
    const rounded = Math.round(value * 1000) / 1000;
    return String(rounded);
}

function getMetricDef(index) {
    return customMetricOrder.find(metric => !metric.text.startsWith('CATEGORY: ') && columnIndexMap[metric.text] === index);
}

function getMetricLabel(index, short) {
    const metric = getMetricDef(index);
    if (!metric) return '';
    let text = asTotal ? metric.text.replace(' per 90', '') : metric.text;
    if (metric.i18n) {
        const translated = t(metric.i18n, metric.text.replace('CATEGORY: ', ''));
        if (translated) {
            text = translated;
            if (!asTotal && metric.text.includes(' per 90')) {
                const per90 = (window.currentTranslations && window.currentTranslations.common && window.currentTranslations.common.per90)
                    ? window.currentTranslations.common.per90
                    : ' per 90';
                if (!text.includes(per90.trim())) text += per90;
            }
        }
    }
    if (short) text = text.replace(/ per 90/g, '').replace(/ par 90 min/g, '');
    return text;
}

function parseCsv(text) {
    const lines = text.split('\n');
    const rows = new Array(lines.length);
    let count = 0;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;
        rows[count++] = line.split(',');
    }
    rows.length = count;
    return rows;
}

function closeOpenDropdowns(exceptTrigger) {
    document.querySelectorAll('.custom-select-trigger.open').forEach(openTrigger => {
        if (openTrigger !== exceptTrigger) {
            openTrigger.classList.remove('open');
            if (openTrigger.nextElementSibling) openTrigger.nextElementSibling.style.display = 'none';
        }
    });
}

function toggleDropdown(trigger, options) {
    const isOpen = trigger.classList.contains('open');
    closeOpenDropdowns(trigger);
    trigger.classList.toggle('open', !isOpen);
    options.style.display = isOpen ? 'none' : 'block';
    return !isOpen;
}

function closeSelector(triggerId, optionsId) {
    const trigger = document.getElementById(triggerId);
    const options = document.getElementById(optionsId);
    if (trigger) trigger.classList.remove('open');
    if (options) options.style.display = 'none';
}

function makeOptionCheck() {
    const check = document.createElement('span');
    check.className = 'option-check';
    return check;
}

function clickedCheck(e) {
    return !!(e.target && e.target.closest && e.target.closest('.option-check'));
}

function clearTriggerFlags(trigger) {
    const existing = trigger.querySelector('.scotland-flag-icon');
    if (existing) existing.remove();
}

function setTriggerIcon(trigger, iconName, scotland) {
    clearTriggerFlags(trigger);
    let icon = trigger.querySelector('iconify-icon');
    const span = trigger.querySelector('span');
    if (scotland) {
        if (icon) icon.style.display = 'none';
        const flag = document.createElement('div');
        flag.className = 'scotland-flag-icon';
        trigger.insertBefore(flag, span);
        trigger.classList.add('has-icon');
        return;
    }
    if (!icon) {
        icon = document.createElement('iconify-icon');
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        trigger.insertBefore(icon, span);
    }
    icon.setAttribute('icon', iconName);
    icon.style.display = 'inline-block';
    trigger.classList.add('has-icon');
}

function appendLeagueFlag(parent, league) {
    if (league.scotland) {
        const flag = document.createElement('div');
        flag.className = 'scotland-flag-icon';
        parent.appendChild(flag);
        return;
    }
    if (league.icon) {
        const icon = document.createElement('iconify-icon');
        icon.setAttribute('icon', league.icon);
        icon.setAttribute('width', '18');
        icon.setAttribute('height', '18');
        parent.appendChild(icon);
    }
}

function translatedItemLabel(item) {
    return t(item.i18n, item.label);
}

function joinSelectedLabels(catalog, selectedSet) {
    const byValue = {};
    catalog.forEach(item => { byValue[item.value] = item; });
    const labels = [];
    selectedSet.forEach(value => {
        const item = byValue[value];
        if (item) labels.push(translatedItemLabel(item));
    });
    return labels.join(' + ');
}

function buildLeagueOptions() {
    const options = document.getElementById('league-select-options');
    options.innerHTML = '';
    options.classList.add('multi-select');

    LEAGUE_PRESETS.forEach(preset => {
        const option = document.createElement('div');
        option.className = 'custom-select-option league-preset';
        option.setAttribute('data-value', preset.value);
        option.appendChild(makeOptionCheck());
        appendLeagueFlag(option, preset);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', preset.i18n);
        span.textContent = preset.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            selectedLeagues = new Set(preset.leagues);
            onLeaguesChanged();
            if (!clickedCheck(e)) closeSelector('league-select-trigger', 'league-select-options');
        });
        options.appendChild(option);
    });

    const divider = document.createElement('div');
    divider.className = 'league-options-divider';
    options.appendChild(divider);

    INDIVIDUAL_LEAGUES.forEach(league => {
        const option = document.createElement('div');
        option.className = 'custom-select-option league-option';
        option.setAttribute('data-value', league.value);
        option.appendChild(makeOptionCheck());
        appendLeagueFlag(option, league);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', league.i18n);
        span.textContent = league.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            if (clickedCheck(e)) {
                if (selectedLeagues.has(league.value)) {
                    if (selectedLeagues.size === 1) return;
                    selectedLeagues.delete(league.value);
                } else {
                    selectedLeagues.add(league.value);
                }
                onLeaguesChanged();
                return;
            }
            selectedLeagues = new Set([league.value]);
            onLeaguesChanged();
            closeSelector('league-select-trigger', 'league-select-options');
        });
        options.appendChild(option);
    });
    updateLeagueTrigger();
}

function onLeaguesChanged() {
    updateLeagueTrigger();
    refreshMetricSliderRanges();
    scheduleSearch({ immediate: true });
}

function updateLeagueTrigger() {
    const trigger = document.getElementById('league-select-trigger');
    const span = trigger.querySelector('span');
    const matchingPreset = LEAGUE_PRESETS.find(preset => setsEqual(selectedLeagues, new Set(preset.leagues)));
    if (matchingPreset) {
        setTriggerIcon(trigger, matchingPreset.icon);
        span.textContent = t(matchingPreset.i18n, matchingPreset.label);
        span.setAttribute('data-i18n', matchingPreset.i18n);
    } else if (selectedLeagues.size === 1) {
        const value = selectedLeagues.values().next().value;
        const league = INDIVIDUAL_LEAGUES.find(item => item.value === value);
        if (league) {
            setTriggerIcon(trigger, league.icon, league.scotland);
            span.textContent = t(league.i18n, league.label);
            span.setAttribute('data-i18n', league.i18n);
        }
    } else {
        setTriggerIcon(trigger, 'emojione:globe-showing-europe-africa');
        span.textContent = selectedLeagues.size > 3
            ? t('leagues.nSelected', '{n} leagues').replace('{n}', String(selectedLeagues.size))
            : joinSelectedLabels(INDIVIDUAL_LEAGUES, selectedLeagues);
        span.removeAttribute('data-i18n');
    }
    document.querySelectorAll('#league-select-options .custom-select-option').forEach(option => {
        const value = option.getAttribute('data-value');
        if (option.classList.contains('league-preset')) {
            const preset = LEAGUE_PRESETS.find(item => item.value === value);
            option.classList.toggle('checked', !!(preset && setsEqual(selectedLeagues, new Set(preset.leagues))));
        } else {
            option.classList.toggle('checked', selectedLeagues.has(value));
        }
    });
}

function buildPositionOptions() {
    const options = document.getElementById('position-select-options');
    options.innerHTML = '';
    options.classList.add('multi-select');

    const allOption = document.createElement('div');
    allOption.className = 'custom-select-option position-preset';
    allOption.setAttribute('data-value', 'All');
    allOption.appendChild(makeOptionCheck());
    const allSpan = document.createElement('span');
    allSpan.setAttribute('data-i18n', 'positions.all');
    allSpan.textContent = 'All positions';
    allOption.appendChild(allSpan);
    allOption.addEventListener('click', function (e) {
        e.stopPropagation();
        selectedPositions = new Set(ALL_POSITIONS);
        onPositionsChanged();
        if (!clickedCheck(e)) closeSelector('position-select-trigger', 'position-select-options');
    });
    options.appendChild(allOption);

    const divider = document.createElement('div');
    divider.className = 'league-options-divider';
    options.appendChild(divider);

    INDIVIDUAL_POSITIONS.forEach(position => {
        const option = document.createElement('div');
        option.className = 'custom-select-option position-option';
        option.setAttribute('data-value', position.value);
        option.appendChild(makeOptionCheck());
        const span = document.createElement('span');
        span.setAttribute('data-i18n', position.i18n);
        span.textContent = position.label;
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            if (clickedCheck(e)) {
                if (selectedPositions.has(position.value)) {
                    if (selectedPositions.size === 1) return;
                    selectedPositions.delete(position.value);
                } else {
                    selectedPositions.add(position.value);
                }
                onPositionsChanged();
                return;
            }
            selectedPositions = new Set([position.value]);
            onPositionsChanged();
            closeSelector('position-select-trigger', 'position-select-options');
        });
        options.appendChild(option);
    });
    updatePositionTrigger();
}

function onPositionsChanged() {
    if (usingRadarDefaults && currentTemplate === 'default') {
        selectedMetricIndexes = radarMetricsForSelection();
        resetThresholds();
        buildMetricOptions();
        renderMetricSliders();
    }
    updatePositionTrigger();
    refreshMetricSliderRanges();
    scheduleSearch({ immediate: true });
}

function updatePositionTrigger() {
    const trigger = document.getElementById('position-select-trigger');
    const span = trigger.querySelector('span');
    if (setsEqual(selectedPositions, new Set(ALL_POSITIONS))) {
        span.textContent = t('positions.all', 'All positions');
        span.setAttribute('data-i18n', 'positions.all');
    } else if (selectedPositions.size === 1) {
        const value = selectedPositions.values().next().value;
        const position = INDIVIDUAL_POSITIONS.find(item => item.value === value);
        span.textContent = t(position.i18n, position.label);
        span.setAttribute('data-i18n', position.i18n);
    } else {
        span.textContent = selectedPositions.size > 3
            ? t('positions.nSelected', '{n} positions').replace('{n}', String(selectedPositions.size))
            : joinSelectedLabels(INDIVIDUAL_POSITIONS, selectedPositions);
        span.removeAttribute('data-i18n');
    }
    document.querySelectorAll('#position-select-options .custom-select-option').forEach(option => {
        const value = option.getAttribute('data-value');
        if (value === 'All') {
            option.classList.toggle('checked', setsEqual(selectedPositions, new Set(ALL_POSITIONS)));
        } else {
            option.classList.toggle('checked', selectedPositions.has(value));
        }
    });
}

function setupSimpleSelector(triggerId, optionsId) {
    const trigger = document.getElementById(triggerId);
    const options = document.getElementById(optionsId);
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        const opened = toggleDropdown(trigger, options);
        if (opened) {
            const search = options.querySelector('input[type="search"]');
            // Metric list has many checked items mid-list; always open at the top.
            if (optionsId === 'metric-select-options' || search) {
                options.scrollTop = 0;
            } else {
                const target = options.querySelector('.custom-select-option.checked, .custom-select-option.selected');
                if (target) target.scrollIntoView({ block: 'nearest' });
            }
            if (search) setTimeout(() => search.focus({ preventScroll: true }), 0);
        }
    });
}

function applyTemplate(id) {
    currentTemplate = id;
    usingRadarDefaults = id === 'default';
    const template = TEMPLATES.find(item => item.id === id);
    selectedMetricIndexes = id === 'default' ? radarMetricsForSelection() : namesToIndexes(template.names);
    resetThresholds();
    buildMetricOptions();
    renderMetricSliders();
    scheduleSearch({ immediate: true });
}

function syncDualRangeUI(lowEl, highEl, trackParent, readout, format) {
    let lo = parseFloat(lowEl.value);
    let hi = parseFloat(highEl.value);
    if (lo > hi) {
        const tmp = lo;
        lo = hi;
        hi = tmp;
        lowEl.value = String(lo);
        highEl.value = String(hi);
    }
    const min = parseFloat(lowEl.min);
    const max = parseFloat(lowEl.max);
    const from = ((lo - min) / (max - min)) * 100;
    const to = ((hi - min) / (max - min)) * 100;
    trackParent.style.setProperty('--from', from + '%');
    trackParent.style.setProperty('--to', to + '%');
    readout.textContent = format(lo, hi);
}

function setAgeRange(lo, hi) {
    const lowEl = document.getElementById('ageLow');
    const highEl = document.getElementById('ageHigh');
    lowEl.value = String(lo);
    highEl.value = String(hi);
    syncDualRangeUI(
        lowEl,
        highEl,
        document.getElementById('ageRange'),
        document.getElementById('ageReadout'),
        (a, b) => Math.round(a) + ' – ' + Math.round(b)
    );
}

function setMinutesRange(lo, hi) {
    const lowEl = document.getElementById('minutesLow');
    const highEl = document.getElementById('minutesHigh');
    lowEl.value = String(lo);
    highEl.value = String(hi);
    syncDualRangeUI(
        lowEl,
        highEl,
        document.getElementById('minutesRange'),
        document.getElementById('minutesReadout'),
        (a, b) => formatInt(a) + ' – ' + formatInt(b)
    );
}

function resetQuickSearchTrigger() {
    const span = document.querySelector('#quick-search-trigger span');
    if (!span) return;
    span.textContent = t('search.quickSearch', 'Quick search');
    span.setAttribute('data-i18n', 'search.quickSearch');
}

function buildQuickSearchOptions() {
    const options = document.getElementById('quick-search-options');
    options.innerHTML = '';
    QUICK_SEARCHES.forEach(preset => {
        const option = document.createElement('div');
        option.className = 'custom-select-option';
        option.setAttribute('data-value', preset.id);
        const span = document.createElement('span');
        span.setAttribute('data-i18n', preset.i18n);
        span.textContent = t(preset.i18n, preset.label);
        option.appendChild(span);
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            applyQuickSearch(preset.id);
            closeSelector('quick-search-trigger', 'quick-search-options');
        });
        options.appendChild(option);
    });
    resetQuickSearchTrigger();
}

function applyQuickSearch(id) {
    const preset = QUICK_SEARCHES.find(item => item.id === id);
    if (!preset) return;

    // Full reset to first-load defaults, then overlay only what the preset defines.
    selectedLeagues = new Set(ALL_LEAGUES);
    selectedPositions = new Set(['Goalkeeper']);
    asTotal = false;
    asPercentile = true;
    currentTemplate = 'default';
    usingRadarDefaults = true;
    sortKey = 'minutes';
    sortDir = 'desc';
    expandedKeys = new Set();
    setAgeRange(15, 45);
    setMinutesRange(0, 10000);
    const playerSearch = document.getElementById('playerSearch');
    if (playerSearch) playerSearch.value = '';

    if (preset.positions) selectedPositions = new Set(preset.positions);
    if (preset.leagues) selectedLeagues = new Set(preset.leagues);
    if (preset.asTotal !== undefined) asTotal = !!preset.asTotal;
    if (preset.age) setAgeRange(preset.age[0], preset.age[1]);
    if (preset.minutes) setMinutesRange(preset.minutes[0], preset.minutes[1]);

    if (preset.metrics) {
        usingRadarDefaults = false;
        currentTemplate = null;
        selectedMetricIndexes = namesToIndexes(Object.keys(preset.metrics));
        metricThresholds = {};
        Object.keys(preset.metrics).forEach(name => {
            const index = columnIndexMap[name];
            if (index !== undefined) metricThresholds[index] = preset.metrics[name];
        });
    } else {
        selectedMetricIndexes = radarMetricsForSelection();
        resetThresholds();
    }

    updatePositionTrigger();
    updateLeagueTrigger();
    syncModeButtons();
    buildMetricOptions();
    renderMetricSliders();
    resetQuickSearchTrigger();
    scheduleSearch({ immediate: true });
}

function resetThresholds() {
    metricThresholds = {};
    if (asPercentile) {
        selectedMetricIndexes.forEach(index => { metricThresholds[index] = 0; });
        return;
    }
    const pool = getPoolRows();
    selectedMetricIndexes.forEach(index => {
        const range = pool.length ? rawRange(pool, index) : { min: 0, max: 100 };
        metricFloor[index] = range.min;
        metricThresholds[index] = range.min;
    });
}

function buildMetricOptions() {
    const list = document.getElementById('metric-select-list');
    if (!list) return;
    list.innerHTML = '';

    const presets = document.createElement('div');
    presets.className = 'pizza-presets';
    TEMPLATES.forEach(template => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pizza-preset-btn' + (currentTemplate === template.id ? ' active' : '');
        btn.setAttribute('data-template', template.id);
        btn.setAttribute('data-i18n', template.i18n);
        btn.textContent = t(template.i18n, template.label);
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            applyTemplate(template.id);
            closeSelector('metric-select-trigger', 'metric-select-options');
        });
        presets.appendChild(btn);
    });
    list.appendChild(presets);

    customMetricOrder.forEach(metric => {
        if (metric.text.startsWith('CATEGORY: ')) {
            const header = document.createElement('div');
            header.className = 'metric-category-header';
            header.setAttribute('data-i18n', metric.i18n);
            header.textContent = t(metric.i18n, metric.text.replace('CATEGORY: ', ''));
            list.appendChild(header);
            return;
        }
        const index = columnIndexMap[metric.text];
        if (index === undefined || FILTER_SKIP.has(index)) return;
        const option = document.createElement('div');
        option.className = 'custom-select-option';
        option.setAttribute('data-index', String(index));
        option.appendChild(makeOptionCheck());
        const span = document.createElement('span');
        span.setAttribute('data-i18n', metric.i18n);
        span.textContent = getMetricLabel(index, true);
        option.appendChild(span);
        if (selectedMetricIndexes.includes(index)) option.classList.add('checked');
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMetric(index, clickedCheck(e));
        });
        list.appendChild(option);
    });
    updateMetricTrigger();
}

function toggleMetric(index, additive) {
    const has = selectedMetricIndexes.includes(index);
    if (additive || has) {
        if (has) {
            if (selectedMetricIndexes.length === 1) return;
            selectedMetricIndexes = selectedMetricIndexes.filter(item => item !== index);
            delete metricThresholds[index];
        } else {
            selectedMetricIndexes = selectedMetricIndexes.concat(index);
            metricThresholds[index] = metricThresholds[index] || 0;
        }
    } else {
        selectedMetricIndexes = [index];
        metricThresholds = {};
        metricThresholds[index] = 0;
        closeSelector('metric-select-trigger', 'metric-select-options');
    }
    selectedMetricIndexes = sortMetricsBySelectorOrder(selectedMetricIndexes);
    usingRadarDefaults = false;
    currentTemplate = null;
    updateMetricChecks();
    updateMetricTrigger();
    renderMetricSliders();
    scheduleSearch({ immediate: true });
}

function updateMetricChecks() {
    document.querySelectorAll('#metric-select-list .pizza-preset-btn').forEach(btn => {
        btn.classList.toggle('active', currentTemplate === btn.getAttribute('data-template'));
    });
    document.querySelectorAll('#metric-select-list .custom-select-option').forEach(option => {
        const index = parseInt(option.getAttribute('data-index'), 10);
        option.classList.toggle('checked', selectedMetricIndexes.includes(index));
    });
}

function updateMetricTrigger() {
    const span = document.querySelector('#metric-select-trigger span');
    if (!span) return;
    span.textContent = t('search.metrics', 'Metrics');
    span.setAttribute('data-i18n', 'search.metrics');
}

function filterMetricOptions(query) {
    const q = (query || '').trim().toLowerCase();
    const list = document.getElementById('metric-select-list');
    let visibleInCategory = false;
    let lastHeader = null;
    Array.from(list.children).forEach(node => {
        if (node.classList.contains('pizza-presets')) {
            node.hidden = false;
            return;
        }
        if (node.classList.contains('metric-category-header')) {
            if (lastHeader) lastHeader.hidden = !visibleInCategory && !!q;
            lastHeader = node;
            visibleInCategory = false;
            node.hidden = false;
            return;
        }
        const text = node.textContent.toLowerCase();
        const hidden = !!q && text.indexOf(q) === -1;
        node.hidden = hidden;
        if (!hidden) visibleInCategory = true;
    });
    if (lastHeader) lastHeader.hidden = !visibleInCategory && !!q;
}

function getPoolRows() {
    if (!originalDataArray.length) return [];
    const combinePositions = selectedPositions.size !== 1;
    const uniquePlayers = combinePositions ? new Set() : null;
    const pool = [];
    for (let i = 1; i < originalDataArray.length; i++) {
        const row = originalDataArray[i];
        if (!row || !row[0]) continue;
        if (!selectedLeagues.has(row[2])) continue;
        if (!selectedPositions.has(row[3])) continue;
        if (combinePositions) {
            const key = row[0] + '\0' + row[1];
            if (uniquePlayers.has(key)) continue;
            uniquePlayers.add(key);
        }
        pool.push(row);
    }
    return pool;
}

function percentileMaps(pool, indexes) {
    const maps = {};
    indexes.forEach(index => {
        const values = [];
        for (let i = 0; i < pool.length; i++) {
            const value = getMetricValue(pool[i], index, asTotal);
            if (Number.isFinite(value)) values.push(value);
        }
        values.sort((a, b) => a - b);
        maps[index] = values;
    });
    return maps;
}

function percentileOf(sorted, value) {
    if (!sorted || !sorted.length || !Number.isFinite(value)) return NaN;
    let lo = 0;
    let hi = sorted.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sorted[mid] <= value) lo = mid + 1;
        else hi = mid;
    }
    return (lo / sorted.length) * 100;
}

function rawRange(pool, index) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < pool.length; i++) {
        const value = getMetricValue(pool[i], index, asTotal);
        if (!Number.isFinite(value)) continue;
        if (value < min) min = value;
        if (value > max) max = value;
    }
    if (!Number.isFinite(min)) min = 0;
    if (!Number.isFinite(max)) max = 1;
    if (min === max) max = min + 1;
    return { min, max };
}

function sliderStep(min, max) {
    const span = max - min;
    if (span <= 5) return 0.01;
    if (span <= 50) return 0.1;
    if (span <= 200) return 1;
    return Math.max(1, Math.round(span / 200));
}

function renderMetricSliders() {
    const wrap = document.getElementById('metricSliders');
    wrap.innerHTML = '';
    const pool = dataReady ? getPoolRows() : [];
    selectedMetricIndexes.forEach(index => {
        const field = document.createElement('div');
        field.className = 'range-field';
        const labelRow = document.createElement('div');
        labelRow.className = 'range-label-row';
        const label = document.createElement('label');
        label.textContent = getMetricLabel(index, true);
        labelRow.appendChild(label);
        const number = document.createElement('input');
        number.type = 'number';
        number.className = 'range-value';
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'range-slider';
        slider.setAttribute('data-index', String(index));
        if (asPercentile) {
            slider.min = '0';
            slider.max = '100';
            slider.step = '1';
            metricFloor[index] = 0;
            const value = metricThresholds[index] || 0;
            slider.value = String(value);
            number.min = '0';
            number.max = '100';
            number.value = value ? String(Math.round(value)) : '';
            number.placeholder = '0';
        } else {
            const range = pool.length ? rawRange(pool, index) : { min: 0, max: 100 };
            const step = sliderStep(range.min, range.max);
            slider.min = String(range.min);
            slider.max = String(range.max);
            slider.step = String(step);
            metricFloor[index] = range.min;
            let value = Number.isFinite(metricThresholds[index]) ? metricThresholds[index] : range.min;
            // Keep inactive floor at the raw minimum (0 is only "off" in percentile mode).
            if (!(value > range.min + 1e-9)) value = range.min;
            metricThresholds[index] = value;
            slider.value = String(value);
            number.min = String(range.min);
            number.max = String(range.max);
            number.step = String(step);
            number.value = value > range.min + 1e-9 ? String(value) : '';
            number.placeholder = formatMetricValue(range.min, index, asTotal);
        }
        const percent = ((parseFloat(slider.value) - parseFloat(slider.min)) / (parseFloat(slider.max) - parseFloat(slider.min))) * 100;
        slider.style.setProperty('--slider-position', percent + '%');
        function applyMetricSlider(value, commit) {
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            if (!Number.isFinite(value)) value = min;
            value = Math.max(min, Math.min(max, value));
            slider.value = String(value);
            number.value = String(value);
            const p = ((value - min) / (max - min)) * 100;
            slider.style.setProperty('--slider-position', p + '%');
            metricThresholds[index] = value;
            if (commit) scheduleSearch({ immediate: true });
        }
        slider.addEventListener('input', function () {
            applyMetricSlider(parseFloat(this.value), false);
        });
        slider.addEventListener('change', function () {
            applyMetricSlider(parseFloat(this.value), true);
        });
        number.addEventListener('change', function () {
            applyMetricSlider(parseFloat(this.value), true);
        });
        labelRow.appendChild(number);
        field.appendChild(labelRow);
        const container = document.createElement('div');
        container.className = 'range-slider-container';
        container.appendChild(slider);
        field.appendChild(container);
        wrap.appendChild(field);
    });
}

function refreshMetricSliderRanges() {
    if (!asPercentile) renderMetricSliders();
}

function bindDualRange(lowEl, highEl, trackParent, readout, format) {
    let last = 'low';
    function sync() {
        let lo = parseFloat(lowEl.value);
        let hi = parseFloat(highEl.value);
        if (lo > hi) {
            if (last === 'low') { hi = lo; highEl.value = String(hi); }
            else { lo = hi; lowEl.value = String(lo); }
        }
        const min = parseFloat(lowEl.min);
        const max = parseFloat(lowEl.max);
        const from = ((lo - min) / (max - min)) * 100;
        const to = ((hi - min) / (max - min)) * 100;
        trackParent.style.setProperty('--from', from + '%');
        trackParent.style.setProperty('--to', to + '%');
        readout.textContent = format(lo, hi);
    }
    function valueFromPointer(clientX) {
        const rect = trackParent.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const min = parseFloat(lowEl.min);
        const max = parseFloat(lowEl.max);
        const step = parseFloat(lowEl.step) || 1;
        const raw = min + ratio * (max - min);
        const snapped = Math.round(raw / step) * step;
        return Math.max(min, Math.min(max, snapped));
    }
    function moveNearest(clientX, commit) {
        const value = valueFromPointer(clientX);
        const lo = parseFloat(lowEl.value);
        const hi = parseFloat(highEl.value);
        if (Math.abs(value - lo) <= Math.abs(value - hi)) {
            last = 'low';
            lowEl.value = String(value);
        } else {
            last = 'high';
            highEl.value = String(value);
        }
        sync();
        if (commit) scheduleSearch({ immediate: true });
    }
    lowEl.addEventListener('input', function () { last = 'low'; sync(); });
    highEl.addEventListener('input', function () { last = 'high'; sync(); });
    lowEl.addEventListener('change', function () { last = 'low'; sync(); scheduleSearch({ immediate: true }); });
    highEl.addEventListener('change', function () { last = 'high'; sync(); scheduleSearch({ immediate: true }); });
    // Click/drag on the track (inputs only receive events on thumbs)
    trackParent.addEventListener('pointerdown', function (e) {
        if (e.target === lowEl || e.target === highEl) return;
        e.preventDefault();
        trackParent.setPointerCapture(e.pointerId);
        moveNearest(e.clientX, false);
        function onMove(ev) { moveNearest(ev.clientX, false); }
        function onUp(ev) {
            moveNearest(ev.clientX, true);
            trackParent.releasePointerCapture(e.pointerId);
            trackParent.removeEventListener('pointermove', onMove);
            trackParent.removeEventListener('pointerup', onUp);
            trackParent.removeEventListener('pointercancel', onUp);
        }
        trackParent.addEventListener('pointermove', onMove);
        trackParent.addEventListener('pointerup', onUp);
        trackParent.addEventListener('pointercancel', onUp);
    });
    sync();
}

function formatInt(value) {
    return Math.round(value).toLocaleString();
}

function setupDualSliders() {
    bindDualRange(
        document.getElementById('ageLow'),
        document.getElementById('ageHigh'),
        document.getElementById('ageRange'),
        document.getElementById('ageReadout'),
        (lo, hi) => Math.round(lo) + ' – ' + Math.round(hi)
    );
    bindDualRange(
        document.getElementById('minutesLow'),
        document.getElementById('minutesHigh'),
        document.getElementById('minutesRange'),
        document.getElementById('minutesReadout'),
        (lo, hi) => formatInt(lo) + ' – ' + formatInt(hi)
    );
}

function syncModeButtons() {
    const totalBtn = document.getElementById('toggleTotal');
    const rawBtn = document.getElementById('toggleRaw');
    const totalTip = document.getElementById('toggleTotalTip');
    const rawTip = document.getElementById('toggleRawTip');

    if (totalBtn) {
        totalBtn.classList.toggle('active', asTotal);
        totalBtn.setAttribute('aria-pressed', asTotal ? 'true' : 'false');
    }
    if (rawBtn) {
        rawBtn.classList.toggle('active', !asPercentile);
        rawBtn.setAttribute('aria-pressed', !asPercentile ? 'true' : 'false');
    }
    if (totalTip) {
        const key = asTotal ? 'toggles.switchToPer90' : 'toggles.switchToTotal';
        totalTip.textContent = t(key, asTotal ? 'Switch to per 90' : 'Switch to total');
        totalTip.setAttribute('data-i18n', key);
    }
    if (rawTip) {
        const key = asPercentile ? 'toggles.switchToRaw' : 'toggles.switchToPercentiles';
        rawTip.textContent = t(key, asPercentile ? 'Switch to raw values' : 'Switch to percentiles');
        rawTip.setAttribute('data-i18n', key);
    }
}

function rowKey(row) {
    return row[0] + '\0' + row[1] + '\0' + row[3];
}

function compareValues(a, b, dir) {
    if (typeof a === 'string' || typeof b === 'string') {
        const cmp = String(a || '').localeCompare(String(b || ''), undefined, { sensitivity: 'base' });
        return dir === 'asc' ? cmp : -cmp;
    }
    const av = Number(a);
    const bv = Number(b);
    if (!Number.isFinite(av) && !Number.isFinite(bv)) return 0;
    if (!Number.isFinite(av)) return 1;
    if (!Number.isFinite(bv)) return -1;
    return dir === 'asc' ? av - bv : bv - av;
}

function runSearch(opts) {
    opts = opts || {};
    if (!dataReady) return;
    const ageLow = parseFloat(document.getElementById('ageLow').value);
    const ageHigh = parseFloat(document.getElementById('ageHigh').value);
    const minutesLow = parseFloat(document.getElementById('minutesLow').value);
    const minutesHigh = parseFloat(document.getElementById('minutesHigh').value);
    const pool = getPoolRows();
    const maps = percentileMaps(pool, selectedMetricIndexes);
    const results = [];

    for (let i = 0; i < pool.length; i++) {
        const row = pool[i];
        const age = parseFloat(row[AGE_INDEX]);
        const minutes = parseFloat(row[MINUTES_INDEX]);
        if (Number.isFinite(age) && (age < ageLow || age > ageHigh)) continue;
        if (Number.isFinite(minutes) && (minutes < minutesLow || minutes > minutesHigh)) continue;

        const values = {};
        const percentiles = {};
        let pass = true;
        for (let m = 0; m < selectedMetricIndexes.length; m++) {
            const index = selectedMetricIndexes[m];
            const raw = getMetricValue(row, index, asTotal);
            if (!Number.isFinite(raw)) { pass = false; break; }
            values[index] = raw;
            const percentile = percentileOf(maps[index], raw);
            percentiles[index] = percentile;
            const threshold = metricThresholds[index];
            const floor = asPercentile ? 0 : (metricFloor[index] || 0);
            if (Number.isFinite(threshold) && threshold > floor + 1e-9) {
                const compare = asPercentile ? percentile : raw;
                if (!(compare >= threshold - 1e-9)) { pass = false; break; }
            }
        }
        if (!pass) continue;
        results.push({ row, values, percentiles });
    }

    results.sort((a, b) => {
        if (sortKey === 'player' || sortKey === 'team') {
            const col = IDENTITY_COLUMNS.find(item => item.key === sortKey).index;
            return compareValues(a.row[col], b.row[col], sortDir);
        }
        if (sortKey === 'age') return compareValues(parseFloat(a.row[AGE_INDEX]), parseFloat(b.row[AGE_INDEX]), sortDir);
        if (sortKey === 'minutes') return compareValues(parseFloat(a.row[MINUTES_INDEX]), parseFloat(b.row[MINUTES_INDEX]), sortDir);
        const index = parseInt(sortKey, 10);
        if (asPercentile) return compareValues(a.percentiles[index], b.percentiles[index], sortDir);
        return compareValues(a.values[index], b.values[index], sortDir);
    });

    lastResults = results;
    renderResults(Object.assign({}, opts, { syncAutoExpand: opts.syncAutoExpand !== false }));
}

const AUTO_EXPAND_LIMIT = 3;

function syncExpandedToVisible(visibleEntries) {
    if (visibleEntries.length > 0 && visibleEntries.length <= AUTO_EXPAND_LIMIT) {
        expandedKeys = new Set(visibleEntries.map(entry => rowKey(entry.row)));
        return;
    }
    // Above the limit (or empty): close every expand, including manual ones.
    expandedKeys = new Set();
}

function displayValue(entry, index) {
    if (asPercentile) {
        const percentile = entry.percentiles[index];
        return Number.isFinite(percentile) ? (Math.round(percentile * 10) / 10).toFixed(1) : '—';
    }
    return formatMetricValue(entry.values[index], index, asTotal);
}

function valueClass(entry, index) {
    if (!asPercentile) return '';
    const percentile = entry.percentiles[index];
    if (percentile >= 75) return 'metric-high';
    if (percentile <= 25) return 'metric-low';
    return '';
}

function renderResults(opts) {
    opts = opts || {};
    const wrapper = document.getElementById('tableWrapper');
    const toolbar = document.getElementById('resultsToolbar');
    const countEl = document.getElementById('resultsCount');
    const query = (document.getElementById('playerSearch').value || '').trim().toLowerCase();
    const filtered = query
        ? lastResults.filter(entry => (entry.row[0] + ' ' + entry.row[1]).toLowerCase().indexOf(query) !== -1)
        : lastResults;

    if (opts.syncAutoExpand) syncExpandedToVisible(filtered);

    toolbar.hidden = false;
    const n = filtered.length;
    const MAX_ROWS = 500;
    const shown = filtered.slice(0, MAX_ROWS);
    countEl.textContent = n === 1
        ? t('search.resultsFoundOne', '1 player found')
        : t('search.resultsFound', '{n} players found').replace('{n}', String(n));
    if (n > MAX_ROWS) {
        countEl.textContent += ' · ' + t('search.showingFirst', 'showing first {n}').replace('{n}', String(MAX_ROWS));
    }

    if (!n) {
        wrapper.innerHTML = '';
        wrapper.hidden = true;
        return;
    }

    wrapper.hidden = false;
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    IDENTITY_COLUMNS.forEach(col => {
        headerRow.appendChild(makeSortHeader(col.key, t(col.i18n, col.label), col.key === 'player'));
    });
    selectedMetricIndexes.forEach(index => {
        headerRow.appendChild(makeSortHeader(String(index), getMetricLabel(index, true), false));
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const animateLimit = opts.reveal ? Math.min(shown.length, 12) : 0;
    shown.forEach((entry, i) => {
        const tr = document.createElement('tr');
        tr.className = 'result-row';
        if (query) tr.classList.add('is-match');
        const key = rowKey(entry.row);
        if (expandedKeys.has(key)) tr.classList.add('is-expanded');
        if (i < animateLimit) {
            tr.style.animationDelay = (i * 0.018) + 's';
        } else {
            tr.style.animation = 'none';
        }
        const playerCell = document.createElement('td');
        playerCell.className = 'player-cell';
        playerCell.textContent = entry.row[0] || '';
        tr.appendChild(playerCell);
        tr.appendChild(textCell(entry.row[1]));
        tr.appendChild(textCell(String(Math.round(parseFloat(entry.row[AGE_INDEX]) || 0))));
        tr.appendChild(textCell(formatInt(parseFloat(entry.row[MINUTES_INDEX]) || 0)));
        selectedMetricIndexes.forEach(index => {
            const td = document.createElement('td');
            td.textContent = displayValue(entry, index);
            const cls = valueClass(entry, index);
            if (cls) td.className = cls;
            tr.appendChild(td);
        });
        tr.addEventListener('click', function () {
            if (expandedKeys.has(key)) expandedKeys.delete(key);
            else expandedKeys.add(key);
            renderResults({});
        });
        tbody.appendChild(tr);
        if (expandedKeys.has(key)) {
            tbody.appendChild(buildDetailRow(entry, IDENTITY_COLUMNS.length + selectedMetricIndexes.length));
        }
    });
    table.appendChild(tbody);
    const playerWidth = measurePlayerColumnWidth(
        shown.map(entry => entry.row[0] || ''),
        t('columns.player', 'Player')
    );
    table.style.setProperty('--player-col-width', playerWidth + 'px');
    const scrollTop = wrapper.scrollTop;
    const scrollLeft = wrapper.scrollLeft;
    wrapper.innerHTML = '';
    if (opts.reveal) table.classList.add('is-reveal');
    wrapper.appendChild(table);
    if (!opts.reveal) {
        wrapper.scrollTop = scrollTop;
        wrapper.scrollLeft = scrollLeft;
    }
    syncTableStickyMetrics();
}

function measurePlayerColumnWidth(names, headerLabel) {
    const canvas = measurePlayerColumnWidth._canvas || (measurePlayerColumnWidth._canvas = document.createElement('canvas'));
    const ctx = canvas.getContext('2d');
    const bodyFont = '500 14px Inter, sans-serif';
    const headerFont = '600 11px Inter, sans-serif';
    ctx.font = bodyFont;
    const widths = names.map(name => ctx.measureText(name || '').width).sort((a, b) => a - b);
    // Fit most names; don't let one outlier blow out the column.
    const at = widths.length ? widths[Math.min(widths.length - 1, Math.floor((widths.length - 1) * 0.92))] : 0;
    ctx.font = headerFont;
    const header = ctx.measureText(headerLabel || 'Player').width + 14;
    const needed = Math.ceil(Math.max(at, header) + 28);
    return Math.max(112, Math.min(205, needed));
}

function textCell(text) {
    const td = document.createElement('td');
    td.textContent = text || '';
    return td;
}

function makeSortHeader(key, label, left) {
    const th = document.createElement('th');
    const content = document.createElement('div');
    content.className = 'header-content';
    const text = document.createElement('span');
    text.textContent = label;
    const indicator = document.createElement('span');
    indicator.className = 'sort-indicator';
    indicator.textContent = sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : '';
    content.appendChild(text);
    content.appendChild(indicator);
    th.appendChild(content);
    th.addEventListener('click', function (e) {
        e.stopPropagation();
        if (sortKey === key) sortDir = sortDir === 'desc' ? 'asc' : 'desc';
        else {
            sortKey = key;
            sortDir = key === 'player' || key === 'team' ? 'asc' : 'desc';
        }
        runSearch({ syncAutoExpand: false });
    });
    return th;
}

function syncTableStickyMetrics() {
    const wrapper = document.getElementById('tableWrapper');
    if (!wrapper) return;
    wrapper.style.setProperty('--tw-client-width', wrapper.clientWidth + 'px');
}

function buildDetailRow(entry, colspan) {
    const tr = document.createElement('tr');
    tr.className = 'detail-row';
    const td = document.createElement('td');
    td.colSpan = colspan;
    const detail = document.createElement('div');
    detail.className = 'player-detail';
    const pin = document.createElement('div');
    pin.className = 'radar-pin';
    const radarWrap = document.createElement('div');
    radarWrap.className = 'radar-wrap';
    radarWrap.appendChild(drawRadar(entry));
    pin.appendChild(radarWrap);
    detail.appendChild(pin);
    td.appendChild(detail);
    tr.appendChild(td);
    tr.addEventListener('click', function (e) { e.stopPropagation(); });
    return tr;
}

function drawRadar(entry) {
    const ns = 'http://www.w3.org/2000/svg';
    const size = 360;
    const cx = 180;
    const cy = 172;
    const r = 112;
    const indexes = selectedMetricIndexes.slice(0, 10);
    const n = indexes.length || 3;
    const svg = document.createElementNS(ns, 'svg');
    // Crop empty margins; more from the bottom so the expand row isn't bottom-heavy
    svg.setAttribute('viewBox', '0 18 ' + size + ' 300');
    svg.setAttribute('aria-hidden', 'true');

    function point(i, ratio) {
        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / n;
        return [cx + Math.cos(angle) * r * ratio, cy + Math.sin(angle) * r * ratio];
    }

    [0.25, 0.5, 0.75, 1].forEach(ring => {
        const poly = document.createElementNS(ns, 'polygon');
        const pts = [];
        for (let i = 0; i < n; i++) pts.push(point(i, ring).join(','));
        poly.setAttribute('points', pts.join(' '));
        poly.setAttribute('fill', 'none');
        poly.setAttribute('stroke', 'currentColor');
        poly.setAttribute('stroke-opacity', '0.18');
        svg.appendChild(poly);
    });

    const valuePts = [];
    indexes.forEach((index, i) => {
        const axis = document.createElementNS(ns, 'line');
        const end = point(i, 1);
        axis.setAttribute('x1', cx);
        axis.setAttribute('y1', cy);
        axis.setAttribute('x2', end[0]);
        axis.setAttribute('y2', end[1]);
        axis.setAttribute('stroke', 'currentColor');
        axis.setAttribute('stroke-opacity', '0.22');
        svg.appendChild(axis);
        const percentile = entry.percentiles[index];
        const ratio = Math.max(0, Math.min(100, Number.isFinite(percentile) ? percentile : 0)) / 100;
        valuePts.push(point(i, ratio).join(','));

        const angle = -Math.PI / 2 + (Math.PI * 2 * i) / n;
        const lp = point(i, 1.16);
        const label = document.createElementNS(ns, 'text');
        label.setAttribute('x', lp[0]);
        label.setAttribute('y', lp[1]);
        const cos = Math.cos(angle);
        if (cos > 0.35) label.setAttribute('text-anchor', 'start');
        else if (cos < -0.35) label.setAttribute('text-anchor', 'end');
        else label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('font-size', '10');
        label.setAttribute('fill', 'currentColor');
        label.textContent = getMetricLabel(index, true);
        svg.appendChild(label);
    });

    const polygon = document.createElementNS(ns, 'polygon');
    polygon.setAttribute('points', valuePts.join(' '));
    polygon.setAttribute('fill', 'rgba(52, 152, 219, 0.28)');
    polygon.setAttribute('stroke', '#3498db');
    polygon.setAttribute('stroke-width', '2');
    svg.appendChild(polygon);
    return svg;
}

function updateMinutesExtent() {
    if (!originalDataArray.length) return;
    let max = 1000;
    for (let i = 1; i < originalDataArray.length; i++) {
        const minutes = parseFloat(originalDataArray[i][MINUTES_INDEX]);
        if (minutes > max) max = minutes;
    }
    max = Math.ceil(max / 100) * 100;
    const low = document.getElementById('minutesLow');
    const high = document.getElementById('minutesHigh');
    low.max = String(max);
    high.max = String(max);
    high.value = String(max);
    high.dispatchEvent(new Event('input'));
}

async function loadData() {
    const wrapper = document.getElementById('tableWrapper');
    if (wrapper) {
        wrapper.innerHTML = '<div id="resultsContainer"><p class="no-results-message">' + t('filters.loading', 'Loading…') + '</p></div>';
    }
    const dataUrl = isPastSeason
        ? 'https://datamb.football/database/OLDINDEX.csv'
        : 'https://datamb.football/database/INDEX.csv';
    dataReady = false;
    try {
        const response = await fetch(dataUrl, { cache: 'no-cache' });
        if (!response.ok) {
            if (wrapper) {
                wrapper.innerHTML = '<div id="resultsContainer"><p class="no-results-message">Failed to load data.</p></div>';
            }
            return;
        }
        const text = await response.text();
        originalDataArray = parseCsv(HEADER_ROW + '\n' + text);
        dataReady = true;
        hasPaintedResults = false;
        updateMinutesExtent();
        refreshMetricSliderRanges();
        scheduleSearch({ immediate: true });
    } catch (error) {
        if (wrapper) {
            wrapper.innerHTML = '<div id="resultsContainer"><p class="no-results-message">Error loading data.</p></div>';
        }
    }
}

function syncPastSeasonButton() {
    const btn = document.getElementById('pastSeasonBtn');
    const tip = document.getElementById('pastSeasonTip');
    if (btn) {
        btn.classList.toggle('active', isPastSeason);
        btn.setAttribute('aria-pressed', isPastSeason ? 'true' : 'false');
    }
    if (tip) {
        const key = isPastSeason ? 'toggles.switchToCurrentSeason' : 'toggles.switchToPastSeason';
        tip.textContent = t(key, isPastSeason ? 'Switch to current season' : 'Switch to past season');
        tip.setAttribute('data-i18n', key);
    }
}

function setupPastSeasonToggle() {
    const btn = document.getElementById('pastSeasonBtn');
    if (!btn) return;
    syncPastSeasonButton();
    btn.addEventListener('click', async function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (btn.disabled) return;
        isPastSeason = !isPastSeason;
        syncPastSeasonButton();
        btn.disabled = true;
        try {
            await loadData();
        } finally {
            btn.disabled = false;
        }
    });
}

function setupModes() {
    document.getElementById('toggleTotal').addEventListener('click', function () {
        asTotal = !asTotal;
        syncModeButtons();
        buildMetricOptions();
        renderMetricSliders();
        scheduleSearch({ immediate: true });
    });
    document.getElementById('toggleRaw').addEventListener('click', function () {
        asPercentile = !asPercentile;
        resetThresholds();
        syncModeButtons();
        renderMetricSliders();
        scheduleSearch({ immediate: true });
    });
    syncModeButtons();
}

function initSearch() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('past') === '1' || params.get('season') === 'past') isPastSeason = true;

    selectedMetricIndexes = radarMetricsForSelection();
    resetThresholds();
    buildLeagueOptions();
    buildPositionOptions();
    buildQuickSearchOptions();
    buildMetricOptions();
    renderMetricSliders();
    setupDualSliders();
    setupModes();
    setupPastSeasonToggle();
    setupSimpleSelector('league-select-trigger', 'league-select-options');
    setupSimpleSelector('position-select-trigger', 'position-select-options');
    setupSimpleSelector('quick-search-trigger', 'quick-search-options');
    setupSimpleSelector('metric-select-trigger', 'metric-select-options');

    document.getElementById('metricSearch').addEventListener('click', function (e) { e.stopPropagation(); });
    document.getElementById('metricSearch').addEventListener('input', function () {
        filterMetricOptions(this.value);
    });
    document.getElementById('metricSearch').addEventListener('keydown', function (e) {
        // Let document-level dropdown nav handle arrows / Enter / Escape.
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') return;
        e.stopPropagation();
    });

    document.getElementById('searchForm').addEventListener('submit', function (e) {
        e.preventDefault();
    });

    document.getElementById('playerSearch').addEventListener('input', function () {
        clearTimeout(playerTimer);
        playerTimer = setTimeout(function () {
            renderResults({ syncAutoExpand: true });
        }, 80);
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.custom-select-container')) closeOpenDropdowns();
    });

    window.addEventListener('resize', syncTableStickyMetrics);
    syncTableStickyMetrics();

    if (typeof applyLanguage === 'function') applyLanguage(typeof getPreferredLanguage === 'function' ? getPreferredLanguage() : 'en');
    loadData();
}

document.addEventListener('DOMContentLoaded', initSearch);

