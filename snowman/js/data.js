// Mock data for Snow Man ticket tips
let tipsData = [
  {
    id: 1,
    title: "FCの先行予約を必ず利用する",
    content: "Snow Manのファンクラブ会員になっておくと、一般発売前に先行予約ができます。これが最も確実にチケットを入手する方法です。",
    source: "Twitter/X: @snowman_tips",
    priority: "high",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "複数デバイスで同時アクセスは避ける",
    content: "同じアカウントで複数のデバイスから同時にアクセスすると、不正アクセスとみなされることがあります。1つのデバイスでアクセスしましょう。",
    source: "Twitter/X: @concert_guide",
    priority: "high",
    date: "2024-02-28"
  },
  {
    id: 3,
    title: "発売開始5分前にはサイトにログインしておく",
    content: "チケット発売開始直前になるとサーバーが混雑します。最低でも5分前には販売サイトにログインして待機しておきましょう。",
    source: "Twitter/X: @ticket_master_jp",
    priority: "high",
    date: "2024-02-10"
  },
  {
    id: 4,
    title: "会員情報は常に最新にしておく",
    content: "住所や電話番号、メールアドレスなどの会員情報は常に最新の状態にしておきましょう。情報が古いとチケット獲得後の手続きに問題が生じる可能性があります。",
    source: "Twitter/X: @fan_community",
    priority: "medium",
    date: "2024-01-22"
  },
  {
    id: 5,
    title: "公式アプリを利用する",
    content: "公式チケット販売アプリがある場合は、ウェブサイトよりもアプリを使用した方がスムーズにチケットを取れる場合があります。",
    source: "Twitter/X: @tech_concert",
    priority: "medium",
    date: "2024-03-05"
  },
  {
    id: 6,
    title: "定期的にFCサイトをチェックする",
    content: "追加公演や返品されたチケットが突然販売されることがあります。定期的にファンクラブサイトをチェックし、情報を見逃さないようにしましょう。",
    source: "Twitter/X: @idol_news",
    priority: "medium",
    date: "2024-02-15"
  },
  {
    id: 7,
    title: "チケット情報をSNSで共有しない",
    content: "チケットの二次元バーコードや詳細情報をSNSで共有すると、不正利用される可能性があります。チケット情報はプライベートに保管しましょう。",
    source: "Twitter/X: @security_tips",
    priority: "high",
    date: "2024-01-30"
  },
  {
    id: 8,
    title: "平日公演を狙う",
    content: "週末の公演は特に人気が高いため、チケットが取りづらいです。平日公演はチケットが取れる確率が比較的高いです。",
    source: "Twitter/X: @concert_tips",
    priority: "low",
    date: "2024-03-10"
  },
  {
    id: 9,
    title: "連番ではなく単独での申し込みを検討する",
    content: "複数枚連番を希望するより、単独チケットの方が当選確率が上がる場合があります。グループで行きたい場合でも、単独チケットで別々に申し込むことを検討してみましょう。",
    source: "Twitter/X: @fan_strategy",
    priority: "medium",
    date: "2024-02-20"
  },
  {
    id: 10,
    title: "複数公演に申し込む",
    content: "特定の1公演だけを狙うのではなく、複数の公演日程に申し込むことで当選確率を上げることができます。",
    source: "Twitter/X: @ticket_advice",
    priority: "medium",
    date: "2024-01-15"
  }
];

// Mock data for venue seating information
const venueData = {
  "tokyo-dome": {
    name: "東京ドーム",
    capacity: "約55,000人",
    image: "images/tokyo-dome.jpg",
    bestSpots: [
      "アリーナA1〜A3ブロック（メインステージに最も近い）",
      "センターステージ周辺（アリーナB2〜B4）",
      "1階スタンド内野席（ステージ全体が見渡せる）"
    ],
    stageNotes: "東京ドームではセンターステージとメインステージ、さらに花道が設置されることが多いです。アリーナ席は抽選制が基本で、FCの先行予約でも確実にアリーナに入れるわけではありません。1階スタンドの内野席もステージが見やすくおすすめです。"
  },
  "yokohama-arena": {
    name: "横浜アリーナ",
    capacity: "約17,000人",
    image: "images/yokohama-arena.jpg",
    bestSpots: [
      "アリーナ前方ブロック（S1〜S3）",
      "スタンド南側1階（全体が見渡せる）",
      "センターステージ周辺（Snow Manのパフォーマンスを360度見られる）"
    ],
    stageNotes: "横浜アリーナは東京ドームより規模が小さいため、どの席からも比較的ステージが見やすいです。センターステージがある場合は、アリーナ中央付近の席がおすすめですが、メインステージのみの場合は前方のS1〜S3ブロックを狙いましょう。"
  },
  "saitama-super-arena": {
    name: "さいたまスーパーアリーナ",
    capacity: "約37,000人",
    image: "images/saitama-arena.jpg",
    bestSpots: [
      "200レベルスタンド前方（ステージ全体が見渡せる）",
      "アリーナAブロック（メインステージ近く）",
      "アリーナセンター（様々な演出が楽しめる）"
    ],
    stageNotes: "さいたまスーパーアリーナでは、アリーナモードとスタジアムモードの2種類のレイアウトがあります。Snow Manの公演ではアリーナモード（約22,000人収容）が採用されることが多いです。アリーナAブロックやBブロック前方が人気ですが、200レベルスタンドも全体を見渡せる良い席です。"
  }
};

// Mock data for past concerts
const pastConcertsData = [
  {
    id: 1,
    title: "Snow Man ASIA TOUR 2D.2D.",
    date: "2023年12月10日",
    venue: "東京ドーム",
    image: "images/concert1.jpg",
    description: "Snow Manの東京ドーム公演では、センターステージと花道を活用した演出が特徴的でした。アリーナC3〜C5ブロックからはメンバーの移動が最も良く見えました。",
    seatingURL: "images/tokyo-dome-2023.jpg"
  },
  {
    id: 2,
    title: "Snow Man LIVE TOUR 2022 Labo.",
    date: "2022年11月3日",
    venue: "横浜アリーナ",
    image: "images/concert2.jpg",
    description: "横浜アリーナ公演では、360度ステージと客席通路を使った近距離パフォーマンスが印象的でした。アリーナ中央部分とスタンド南側が特に人気の席でした。",
    seatingURL: "images/yokohama-2022.jpg"
  },
  {
    id: 3,
    title: "Snow Man DEBUT TOUR 2021 Grandeur",
    date: "2021年7月18日",
    venue: "さいたまスーパーアリーナ",
    image: "images/concert3.jpg",
    description: "デビューツアーのさいたまスーパーアリーナ公演はアリーナモードで実施。200レベルスタンド前方からはステージ全体のパフォーマンスが見渡せる良席でした。",
    seatingURL: "images/saitama-2021.jpg"
  }
];