# PRIMIO BUILD SPEC: KoRT Digital Dollars v2.0
**Format:** Machine instructions. No prose. Execute sequentially.
**Target:** Flutter mobile app (iOS + Android)
**Supabase Project:** `skfxkjshsnvimdeirfec`
**Branch:** `feature/quantum-optimizer`

---

## EXISTING STATE (do not delete/regenerate)

Tables already in Supabase:
- `knights` (id, display_name, email, avatar_url, reputation_score, credit_limit, etc.)
- `spherical_nodes` (knight_id, sphere_level 0-5, designation)
- `digital_dollars_ledger` (tx_id, from_knight_id, to_knight_id, amount, sphere_level, tx_type, signed_tx_json, memo)
- `missions` (id, title, priority, status, assigned_knight_id, reward_dd, quantum_score)
- `wellness_missions` (knight_id, mission_type, reward_dd, completed)
- `knight_balances` VIEW (knight_id, balance, total_transactions)

Already built by Primio (extend, do not rebuild):
- SphereService, SphereDashboard, LedgerTab, DDHistoryScreen (4 tabs), DDStackScreen
- AuthProvider (getters: `.isLoggedIn`, `.member`, NOT methods)
- SupabaseService (existing query patterns)

---

## NEW TABLES TO CREATE (run in Supabase SQL Editor)

```sql
-- Social connections
CREATE TABLE IF NOT EXISTS knight_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    friend_id UUID NOT NULL REFERENCES knights(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','blocked')),
    referred_by UUID REFERENCES knights(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(knight_id, friend_id)
);

-- Social platform links
CREATE TABLE IF NOT EXISTS knight_socials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    platform TEXT NOT NULL CHECK (platform IN (
        'discord','twitter','instagram','facebook','tiktok','youtube',
        'twitch','steam','reddit','linkedin','drt_social','telegram'
    )),
    handle TEXT NOT NULL,
    profile_url TEXT,
    auto_post BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(knight_id, platform)
);

-- Guilds / Teams
CREATE TABLE IF NOT EXISTS guilds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    leader_id UUID NOT NULL REFERENCES knights(id),
    avatar_url TEXT,
    guild_level INT DEFAULT 1,
    total_dd_earned DECIMAL(12,2) DEFAULT 0,
    member_count INT DEFAULT 1,
    is_recruiting BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS guild_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guild_id UUID NOT NULL REFERENCES guilds(id),
    knight_id UUID NOT NULL REFERENCES knights(id),
    role TEXT DEFAULT 'member' CHECK (role IN ('leader','officer','member')),
    joined_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(guild_id, knight_id)
);

-- Games hub
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    game_type TEXT NOT NULL CHECK (game_type IN (
        'solo_casual','solo_puzzle','multiplayer_coop','multiplayer_pvp',
        'guild_raid','daily_challenge','community_quest','steam_linked'
    )),
    icon_url TEXT,
    dd_per_play DECIMAL(8,2) DEFAULT 1.00,
    dd_per_win DECIMAL(8,2) DEFAULT 5.00,
    dd_per_boss DECIMAL(8,2) DEFAULT 25.00,
    min_players INT DEFAULT 1,
    max_players INT DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    play_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID NOT NULL REFERENCES games(id),
    knight_id UUID NOT NULL REFERENCES knights(id),
    guild_id UUID REFERENCES guilds(id),
    score INT DEFAULT 0,
    dd_earned DECIMAL(8,2) DEFAULT 0,
    duration_seconds INT DEFAULT 0,
    is_win BOOLEAN DEFAULT false,
    session_data JSONB,
    played_at TIMESTAMPTZ DEFAULT now()
);

-- Community help marketplace
CREATE TABLE IF NOT EXISTS help_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    requester_id UUID NOT NULL REFERENCES knights(id),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'tech_support','rides','errands','tutoring','repairs',
        'yard_work','pet_care','moving','cooking','other'
    )),
    reward_dd DECIMAL(8,2) NOT NULL DEFAULT 10.00,
    status TEXT DEFAULT 'open' CHECK (status IN ('open','claimed','completed','cancelled')),
    helper_id UUID REFERENCES knights(id),
    location_text TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- Notifications aggregator
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    source TEXT NOT NULL CHECK (source IN (
        'dd_transaction','mission','game','guild','help_request',
        'friend_request','system','drt_social','wellness','achievement'
    )),
    title TEXT NOT NULL,
    body TEXT,
    action_url TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Cashout requests
CREATE TABLE IF NOT EXISTS cashout_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    amount_dd DECIMAL(12,2) NOT NULL CHECK (amount_dd >= 10),
    method TEXT NOT NULL CHECK (method IN ('paypal','interac','crypto','gift_card','mesh_credit')),
    payout_details JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','denied')),
    created_at TIMESTAMPTZ DEFAULT now(),
    processed_at TIMESTAMPTZ
);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT NOT NULL,
    dd_reward DECIMAL(8,2) DEFAULT 0,
    requirement_type TEXT NOT NULL,
    requirement_value INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS knight_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knight_id UUID NOT NULL REFERENCES knights(id),
    achievement_id UUID NOT NULL REFERENCES achievements(id),
    unlocked_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(knight_id, achievement_id)
);
```

---

## SCREEN ARCHITECTURE (add to existing app)

### Route map (add these routes):
```
/social              -> SocialDashboardScreen
/social/friends      -> FriendsScreen
/social/profile/:id  -> KnightProfileScreen
/wallet              -> WalletScreen (replaces basic DD view)
/wallet/cashout      -> CashoutScreen
/wallet/history      -> DDHistoryScreen (existing, extended)
/games               -> GameHubScreen
/games/:id           -> GamePlayScreen
/games/leaderboard   -> LeaderboardScreen
/guilds              -> GuildListScreen
/guilds/:id          -> GuildDetailScreen
/guilds/create       -> CreateGuildScreen
/help                -> HelpMarketplaceScreen
/help/create         -> CreateHelpRequestScreen
/help/:id            -> HelpDetailScreen
/notifications       -> NotificationsScreen
/admin               -> AdminPanelScreen (role-gated)
```

---

## SCREEN SPECS (build each one)

### 1. WalletScreen `/wallet`
- Hero card: Total DD balance (large, animated counter)
- RTD balance below (1 RTD = 1 DD for display, explain conversion)
- 4 action buttons row: [Send] [Receive] [Cash Out] [History]
- Sphere breakdown: 6 colored bars showing balance per sphere (S0-S5)
- Recent transactions list (last 10 from digital_dollars_ledger)
- Earnings chart: line graph of DD earned per day (last 30 days)
- Pull-to-refresh

### 2. CashoutScreen `/wallet/cashout`
- Current balance display
- Amount input (min 10 DD)
- Method selector: PayPal, Interac e-Transfer, Crypto, Gift Card, Mesh Credit
- Method-specific detail fields (email for PayPal, phone for Interac, wallet address for crypto)
- Fee display: 0% for Mesh Credit, 5% for PayPal/Interac, 3% for crypto
- Confirm button -> insert into cashout_requests table
- History of past cashouts below

### 3. SocialDashboardScreen `/social`
- Knight profile card (avatar, display_name, reputation_score, member_since)
- Connected socials row (icons for each linked platform from knight_socials)
- Link new social button
- Stats row: [Friends count] [Guild name] [Games played] [DD earned]
- Friend activity feed: recent game wins, help completed, achievements unlocked by friends
- "Invite Friends" prominent CTA with referral link (kortx.ca/r/{knight_id})

### 4. FriendsScreen `/social/friends`
- Tab bar: [Friends] [Pending] [Find]
- Friends tab: list of accepted connections with last_active, DD earned, guild
- Pending tab: incoming/outgoing requests with accept/decline
- Find tab: search by display_name or email, shows mutual friends count
- Each friend row: tap -> KnightProfileScreen, long press -> message via DRT.Social

### 5. KnightProfileScreen `/social/profile/:id`
- Avatar, display_name, reputation badge
- Public stats: DD earned (all time), games played, help given, guild, achievements
- Connected socials (public ones only)
- Mutual friends list
- [Add Friend] / [Remove Friend] / [Block] buttons
- If viewing own profile: [Edit Profile] button

### 6. GameHubScreen `/games`
- Category tabs: [All] [Solo] [Multiplayer] [Guild] [Daily] [Steam]
- Game cards grid: icon, title, DD per play, DD per win, player count, play_count
- Featured game banner at top (highest DD payout)
- "Hot right now" section: games with most active players
- "Your games" section: recently played by this knight
- Each card tap -> GamePlayScreen

### 7. GamePlayScreen `/games/:id`
- Game description, rules, rewards breakdown
- [Play Now] button (solo) or [Find Match] button (multiplayer)
- If multiplayer: lobby showing waiting players with DD stakes
- If guild raid: guild member roster with ready status
- Leaderboard for this game (top 10)
- Your stats for this game: plays, wins, total DD earned
- Share button: "I just earned X DD playing [game]!" -> DRT.Social + connected socials

### 8. LeaderboardScreen `/games/leaderboard`
- Tab bar: [Today] [Week] [All Time] [Guild]
- Each row: rank, avatar, display_name, DD earned, games played
- Highlight current knight's position
- Guild tab: guild rankings by total_dd_earned

### 9. GuildListScreen `/guilds`
- Tab bar: [My Guild] [Recruiting] [Top Guilds]
- Guild cards: name, avatar, member_count, total_dd_earned, guild_level
- If no guild: prominent [Create Guild] and [Browse Guilds] buttons
- Recruiting tab: guilds with is_recruiting=true, sorted by activity

### 10. GuildDetailScreen `/guilds/:id`
- Guild banner, name, description, guild_level
- Leader display with crown icon
- Member list with roles (leader/officer/member), DD contributed
- Guild stats: total DD earned, missions completed, games won
- Guild chat link -> DRT.Social group
- If leader: [Manage Members] [Edit Guild] [Recruit] buttons
- If member: [Leave Guild] button
- If not member + recruiting: [Request to Join] button

### 11. HelpMarketplaceScreen `/help`
- Tab bar: [Available] [My Requests] [My Helps]
- Available: open help_requests sorted by reward_dd desc, filterable by category
- Each card: title, category icon, reward_dd, requester display_name, location_text
- [Create Help Request] FAB
- My Requests: requests I posted (status tracking)
- My Helps: requests I claimed/completed (DD earned)

### 12. HelpDetailScreen `/help/:id`
- Full description, category, reward_dd, requester profile card
- Location display (text only, no map needed)
- [Claim This] button (sets helper_id, status='claimed')
- If I'm helper + claimed: [Mark Complete] button
- If I'm requester: [Cancel] button, [Confirm Complete] button (triggers DD transfer)

### 13. NotificationsScreen `/notifications`
- Grouped by date (Today, Yesterday, This Week, Earlier)
- Each notification: source icon, title, body, time_ago, is_read indicator
- Swipe to dismiss / mark read
- Filter chips: [All] [Transactions] [Games] [Social] [Help] [System]
- Badge count on bottom nav icon (unread count)

### 14. AdminPanelScreen `/admin` (role-gated: show only if knight.role = 'admin' or 'moderator')
- Stats overview: total knights, total DD in circulation, active games, open help requests
- Moderation queue: flagged content, reported users
- Broadcast notification: send system notification to all knights
- Game management: enable/disable games, adjust DD payouts
- Cashout queue: pending cashout requests with approve/deny
- If moderator (not admin): hide cashout queue and game management

---

## SERVICES TO CREATE

### SocialService `lib/services/social_service.dart`
```
getFriends(knightId) -> List<KnightConnection>
getPendingRequests(knightId) -> List<KnightConnection>
sendFriendRequest(knightId, friendId) -> void
acceptFriendRequest(connectionId) -> void
declineFriendRequest(connectionId) -> void
searchKnights(query) -> List<Knight>
getKnightSocials(knightId) -> List<KnightSocial>
linkSocial(knightId, platform, handle, profileUrl) -> void
unlinkSocial(socialId) -> void
```

### GameService `lib/services/game_service.dart`
```
getGames({category}) -> List<Game>
getGameDetail(gameId) -> Game
startSession(gameId, knightId, {guildId}) -> GameSession
endSession(sessionId, score, isWin) -> GameSession (auto-mints DD)
getLeaderboard(gameId, {period}) -> List<LeaderboardEntry>
getMyGameStats(knightId) -> GameStats
```

### GuildService `lib/services/guild_service.dart`
```
getGuilds({recruiting}) -> List<Guild>
getGuildDetail(guildId) -> Guild with members
createGuild(name, description) -> Guild
joinGuild(guildId, knightId) -> void
leaveGuild(guildId, knightId) -> void
updateGuild(guildId, data) -> void
getGuildMembers(guildId) -> List<GuildMember>
```

### HelpService `lib/services/help_service.dart`
```
getHelpRequests({category, status}) -> List<HelpRequest>
createHelpRequest(title, description, category, rewardDd) -> HelpRequest
claimHelp(requestId, knightId) -> void
completeHelp(requestId) -> void (triggers DD transfer from requester to helper)
getMyRequests(knightId) -> List<HelpRequest>
getMyHelps(knightId) -> List<HelpRequest>
```

### NotificationService `lib/services/notification_service.dart`
```
getNotifications(knightId, {source, limit}) -> List<Notification>
getUnreadCount(knightId) -> int
markRead(notificationId) -> void
markAllRead(knightId) -> void
```

### CashoutService `lib/services/cashout_service.dart`
```
requestCashout(knightId, amount, method, details) -> CashoutRequest
getMyCashouts(knightId) -> List<CashoutRequest>
getCashoutFee(method) -> double (0.0 for mesh, 0.05 for paypal/interac, 0.03 for crypto)
```

---

## BOTTOM NAV UPDATE

Current bottom nav -> Update to 5 tabs:
```
[Home] [Games] [Wallet] [Social] [More]
```
- Home: existing dashboard
- Games: GameHubScreen
- Wallet: WalletScreen (hero balance + actions)
- Social: SocialDashboardScreen
- More: settings, help marketplace, notifications (with badge), admin (if role permits)

---

## UI RULES
- Color scheme: dark blue (#0d1117) background, gold (#c9a84c) accents, blue (#0033a0) primary
- DD amounts: always green for earned (+), red for spent (-), gold for pending
- Sphere colors: S0=#c9a84c, S1=#e8a87c, S2=#0033a0, S3=#2d6a4f, S4=#7c3aed, S5=#dc2626
- All lists: pull-to-refresh + infinite scroll pagination
- All balance displays: animated number counter on load
- Empty states: illustration + CTA button (never blank screens)
- Loading states: shimmer placeholders (never spinners)
- Card style: rounded corners 16px, subtle shadow, glassmorphism on hero cards
- Tagline on wallet: "Get paid to belong. No one gets left behind."

---

## DATA FLOW
- All queries go through Supabase client (existing SupabaseService pattern)
- DD transfers: insert into digital_dollars_ledger + insert notification for both parties
- Game DD minting: endSession inserts ledger row (from='treasury', to=knight, type='mission_reward')
- Help DD transfer: completeHelp inserts ledger row (from=requester, to=helper, type='transfer')
- Friend referral: on accepted friend request, if referred_by is set, mint 10 DD referral bonus
- Achievement unlock: check requirement after each action, insert knight_achievement + notification + DD reward

---

## BUILD ORDER
1. New models (Knight, Guild, Game, HelpRequest, Notification, CashoutRequest)
2. New services (Social, Game, Guild, Help, Notification, Cashout)
3. WalletScreen + CashoutScreen
4. GameHubScreen + GamePlayScreen + LeaderboardScreen
5. SocialDashboardScreen + FriendsScreen + KnightProfileScreen
6. GuildListScreen + GuildDetailScreen + CreateGuildScreen
7. HelpMarketplaceScreen + CreateHelpRequestScreen + HelpDetailScreen
8. NotificationsScreen (with badge on bottom nav)
9. AdminPanelScreen (role-gated)
10. Update bottom nav to 5 tabs
11. Wire referral tracking + achievement system
12. Test all flows end-to-end
