'use client'

import React, { useState } from 'react'
import { Box, Typography, Paper, Divider } from '@mui/material'
import { CategorySelector, CategoryItem, SelectedCategory } from '../../components/CategorySelector/index'

// 製造業のカテゴリーデータ（図に基づく）
const manufacturingCategories: CategoryItem[] = [
  {
    name: "09食料品製造業",
    id: 900,
    children: [
      { name: "090管理、補助的経済活動を行う事業所", id: 901 },
      { name: "092水産食料品製造業", id: 902 },
      { name: "093野菜缶詰・果実缶詰・農産保存食料品製造業", id: 903 }
    ]
  },
  {
    name: "製造業",
    id: 1000,
    children: [
      { name: "09食料品製造業", id: 1001 },
      { name: "090管理、補助的経済活動を行う事業所", id: 1002 },
      { name: "092水産食料品製造業", id: 1003 },
      { name: "093野菜缶詰・果実缶詰・農産保存食料品製造業", id: 1004 }
    ]
  }
]

// 大分類のカテゴリーデータ（多层级结构）
const majorCategories: CategoryItem[] = [
  {
    name: "農業、林業",
    id: 100,
    children: [
      { 
        name: "農業", 
        id: 101,
        children: [
          { 
            name: "耕種農業", 
            id: 1011,
            children: [
              { 
                name: "米作農業", 
                id: 10111,
                children: [
                  { name: "水稲作", id: 101111 },
                  { name: "陸稲作", id: 101112 },
                  { 
                    name: "特殊栽培米", 
                    id: 101113,
                    children: [
                      { name: "有機栽培米", id: 1011131 },
                      { name: "無農薬栽培米", id: 1011132 },
                      { name: "減農薬栽培米", id: 1011133 }
                    ]
                  }
                ]
              },
              { 
                name: "麦作農業", 
                id: 10112,
                children: [
                  { name: "小麦作", id: 101121 },
                  { name: "大麦作", id: 101122 },
                  { name: "ライ麦作", id: 101123 }
                ]
              },
              { 
                name: "野菜作農業", 
                id: 10113,
                children: [
                  { name: "根菜類栽培", id: 101131 },
                  { name: "葉物野菜栽培", id: 101132 },
                  { 
                    name: "果菜類栽培", 
                    id: 101133,
                    children: [
                      { name: "トマト栽培", id: 1011331 },
                      { name: "キュウリ栽培", id: 1011332 },
                      { name: "ナス栽培", id: 1011333 },
                      { name: "ピーマン栽培", id: 1011334 }
                    ]
                  }
                ]
              }
            ]
          },
          { 
            name: "畜産農業", 
            id: 1012,
            children: [
              { 
                name: "肉用牛飼養業", 
                id: 10121,
                children: [
                  { name: "和牛飼養", id: 101211 },
                  { name: "乳用牛飼養", id: 101212 },
                  { 
                    name: "交雑牛飼養", 
                    id: 101213,
                    children: [
                      { name: "F1牛飼養", id: 1012131 },
                      { name: "F2牛飼養", id: 1012132 }
                    ]
                  }
                ]
              },
              { 
                name: "豚飼養業", 
                id: 10122,
                children: [
                  { name: "肉豚飼養", id: 101221 },
                  { name: "種豚飼養", id: 101222 },
                  { name: "子豚飼養", id: 101223 }
                ]
              },
              { 
                name: "鶏飼養業", 
                id: 10123,
                children: [
                  { name: "採卵鶏飼養", id: 101231 },
                  { name: "肉用鶏飼養", id: 101232 },
                  { 
                    name: "地鶏飼養", 
                    id: 101233,
                    children: [
                      { name: "比内地鶏飼養", id: 1012331 },
                      { name: "薩摩地鶏飼養", id: 1012332 },
                      { name: "名古屋コーチン飼養", id: 1012333 }
                    ]
                  }
                ]
              }
            ]
          },
          { 
            name: "農業サービス業", 
            id: 1013,
            children: [
              { 
                name: "農業機械作業受託", 
                id: 10131,
                children: [
                  { name: "耕起作業受託", id: 101311 },
                  { name: "播種作業受託", id: 101312 },
                  { name: "収穫作業受託", id: 101313 }
                ]
              }
            ]
          }
        ]
      },
      { 
        name: "林業", 
        id: 102,
        children: [
          { 
            name: "育林業", 
            id: 1021,
            children: [
              { 
                name: "人工造林業", 
                id: 10211,
                children: [
                  { name: "杉植林", id: 102111 },
                  { name: "檜植林", id: 102112 },
                  { 
                    name: "松植林", 
                    id: 102113,
                    children: [
                      { name: "赤松植林", id: 1021131 },
                      { name: "黒松植林", id: 1021132 },
                      { name: "五葉松植林", id: 1021133 }
                    ]
                  }
                ]
              },
              { 
                name: "天然林保育", 
                id: 10212,
                children: [
                  { name: "広葉樹林保育", id: 102121 },
                  { name: "混交林保育", id: 102122 },
                  { name: "原生林保護", id: 102123 }
                ]
              }
            ]
          },
          { 
            name: "素材生産業", 
            id: 1022,
            children: [
              { 
                name: "立木伐採業", 
                id: 10221,
                children: [
                  { name: "針葉樹伐採", id: 102211 },
                  { name: "広葉樹伐採", id: 102212 },
                  { 
                    name: "特殊伐採", 
                    id: 102213,
                    children: [
                      { name: "間伐作業", id: 1022131 },
                      { name: "皆伐作業", id: 1022132 },
                      { name: "択伐作業", id: 1022133 }
                    ]
                  }
                ]
              }
            ]
          },
          { 
            name: "特用林産物生産業", 
            id: 1023,
            children: [
              { 
                name: "きのこ類栽培", 
                id: 10231,
                children: [
                  { name: "しいたけ栽培", id: 102311 },
                  { name: "なめこ栽培", id: 102312 },
                  { 
                    name: "高級きのこ栽培", 
                    id: 102313,
                    children: [
                      { name: "まつたけ栽培", id: 1023131 },
                      { name: "トリュフ栽培", id: 1023132 }
                    ]
                  }
                ]
              },
              { 
                name: "山菜栽培", 
                id: 10232,
                children: [
                  { name: "わらび栽培", id: 102321 },
                  { name: "ぜんまい栽培", id: 102322 },
                  { name: "たけのこ栽培", id: 102323 }
                ]
              }
            ]
          }
        ]
      },
      { 
        name: "漁業", 
        id: 103,
        children: [
          { 
            name: "海面漁業", 
            id: 1031,
            children: [
              { 
                name: "沿岸漁業", 
                id: 10311,
                children: [
                  { name: "定置網漁業", id: 103111 },
                  { name: "刺網漁業", id: 103112 },
                  { 
                    name: "釣漁業", 
                    id: 103113,
                    children: [
                      { name: "一本釣り", id: 1031131 },
                      { name: "延縄漁業", id: 1031132 },
                      { name: "釣り船業", id: 1031133 }
                    ]
                  }
                ]
              },
              { 
                name: "沖合漁業", 
                id: 10312,
                children: [
                  { name: "まぐろ漁業", id: 103121 },
                  { name: "かつお漁業", id: 103122 },
                  { name: "さんま漁業", id: 103123 }
                ]
              }
            ]
          },
          { 
            name: "内水面漁業", 
            id: 1032,
            children: [
              { 
                name: "河川漁業", 
                id: 10321,
                children: [
                  { name: "鮎漁業", id: 103211 },
                  { name: "鱒漁業", id: 103212 },
                  { name: "うなぎ漁業", id: 103213 }
                ]
              },
              { 
                name: "湖沼漁業", 
                id: 10322,
                children: [
                  { name: "わかさぎ漁業", id: 103221 },
                  { name: "しじみ漁業", id: 103222 },
                  { 
                    name: "特殊淡水魚漁業", 
                    id: 103223,
                    children: [
                      { name: "イワナ漁業", id: 1032231 },
                      { name: "ヤマメ漁業", id: 1032232 }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "鉱業、採石業、砂利採取業",
    id: 110,
    children: [
      { name: "金属鉱業", id: 111 },
      { name: "石炭・亜炭鉱業", id: 112 },
      { name: "原油・天然ガス鉱業", id: 113 },
      { name: "採石業、砂・砂利・玉石採取業", id: 114 }
    ]
  },
  {
    name: "建設業",
    id: 200,
    children: [
      { 
        name: "総合工事業", 
        id: 201,
        children: [
          { name: "土木工事業", id: 2011 },
          { name: "建築工事業", id: 2012 }
        ]
      },
      { 
        name: "職別工事業", 
        id: 202,
        children: [
          { name: "大工工事業", id: 2021 },
          { name: "左官工事業", id: 2022 },
          { name: "とび・土工・コンクリート工事業", id: 2023 },
          { name: "石工事業", id: 2024 }
        ]
      },
      { 
        name: "設備工事業", 
        id: 203,
        children: [
          { name: "電気工事業", id: 2031 },
          { name: "管工事業", id: 2032 },
          { name: "機械器具設置工事業", id: 2033 }
        ]
      }
    ]
  },
  {
    name: "製造業",
    id: 300,
    children: [
      { 
        name: "食料品製造業", 
        id: 301,
        children: [
          { 
            name: "畜産食料品製造業", 
            id: 3011,
            children: [
              { 
                name: "部分肉・冷凍肉製造業", 
                id: 30111,
                children: [
                  { name: "牛肉加工業", id: 301111 },
                  { name: "豚肉加工業", id: 301112 },
                  { name: "鶏肉加工業", id: 301113 },
                  { 
                    name: "その他食肉加工業", 
                    id: 301114,
                    children: [
                      { name: "羊肉加工業", id: 3011141 },
                      { name: "馬肉加工業", id: 3011142 },
                      { name: "鹿肉加工業", id: 3011143 }
                    ]
                  }
                ]
              },
              { name: "肉加工品製造業", id: 30112 },
              { name: "処理牛乳・乳飲料製造業", id: 30113 },
              { name: "バター・チーズ・粉乳・その他乳製品製造業", id: 30114 }
            ]
          },
          { 
            name: "水産食料品製造業", 
            id: 3012,
            children: [
              { 
                name: "水産缶詰・瓶詰製造業", 
                id: 30121,
                children: [
                  { name: "まぐろ缶詰製造業", id: 301211 },
                  { name: "さけ缶詰製造業", id: 301212 },
                  { name: "いわし缶詰製造業", id: 301213 }
                ]
              },
              { 
                name: "海藻加工業", 
                id: 30122,
                children: [
                  { name: "のり加工業", id: 301221 },
                  { name: "わかめ加工業", id: 301222 },
                  { name: "こんぶ加工業", id: 301223 },
                  { 
                    name: "その他海藻加工業", 
                    id: 301224,
                    children: [
                      { name: "ひじき加工業", id: 3012241 },
                      { name: "もずく加工業", id: 3012242 }
                    ]
                  }
                ]
              },
              { name: "水産練製品製造業", id: 30123 }
            ]
          },
          { 
            name: "野菜缶詰・果実缶詰・農産保存食料品製造業", 
            id: 3013,
            children: [
              { name: "野菜缶詰製造業", id: 30131 },
              { name: "果実缶詰製造業", id: 30132 },
              { name: "農産保存食料品製造業", id: 30133 }
            ]
          },
          { name: "調味料製造業", id: 3014 },
          { name: "糖類製造業", id: 3015 }
        ]
      },
      { 
        name: "飲料・たばこ・飼料製造業", 
        id: 302,
        children: [
          { name: "清涼飲料製造業", id: 3021 },
          { name: "酒類製造業", id: 3022 },
          { name: "茶・コーヒー製造業", id: 3023 },
          { name: "製氷業", id: 3024 },
          { name: "たばこ製造業", id: 3025 }
        ]
      },
      { 
        name: "繊維工業", 
        id: 303,
        children: [
          { name: "製糸業、紡績業、化学繊維・紡績糸製造業", id: 3031 },
          { name: "織物業", id: 3032 },
          { name: "ニット生地製造業", id: 3033 },
          { name: "染色整理業", id: 3034 }
        ]
      },
      { 
        name: "衣服・その他の繊維製品製造業", 
        id: 304,
        children: [
          { name: "織物・ニット製外衣製造業", id: 3041 },
          { name: "織物・ニット製下着類製造業", id: 3042 },
          { name: "和装製品・その他の衣服・繊維製身の回り品製造業", id: 3043 }
        ]
      }
    ]
  },
  {
    name: "電気・ガス・熱供給・水道業",
    id: 350,
    children: [
      { name: "電気業", id: 351 },
      { name: "ガス業", id: 352 },
      { name: "熱供給業", id: 353 },
      { name: "水道業", id: 354 }
    ]
  },
  {
    name: "情報通信業",
    id: 400,
    children: [
      { 
        name: "通信業", 
        id: 401,
        children: [
          { name: "固定電気通信業", id: 4011 },
          { name: "移動電気通信業", id: 4012 },
          { name: "電気通信に附帯するサービス業", id: 4013 }
        ]
      },
      { name: "放送業", id: 402 },
      { 
        name: "情報サービス業", 
        id: 403,
        children: [
          { name: "ソフトウェア業", id: 4031 },
          { name: "情報処理・提供サービス業", id: 4032 }
        ]
      },
      { name: "インターネット附随サービス業", id: 404 },
      { 
        name: "映像・音声・文字情報制作業", 
        id: 405,
        children: [
          { name: "映像情報制作・配給業", id: 4051 },
          { name: "音声情報制作業", id: 4052 },
          { name: "新聞業", id: 4053 },
          { name: "出版業", id: 4054 }
        ]
      }
    ]
  },
  {
    name: "運輸業、郵便業",
    id: 500,
    children: [
      { 
        name: "鉄道業", 
        id: 501,
        children: [
          { name: "鉄道業", id: 5011 },
          { name: "軌道業", id: 5012 }
        ]
      },
      { 
        name: "道路旅客運送業", 
        id: 502,
        children: [
          { name: "一般乗合旅客自動車運送業", id: 5021 },
          { name: "一般乗用旅客自動車運送業", id: 5022 },
          { name: "一般貸切旅客自動車運送業", id: 5023 }
        ]
      },
      { 
        name: "道路貨物運送業", 
        id: 503,
        children: [
          { name: "一般貨物自動車運送業", id: 5031 },
          { name: "特定貨物自動車運送業", id: 5032 },
          { name: "貨物軽自動車運送業", id: 5033 }
        ]
      },
      { name: "水運業", id: 504 },
      { name: "航空運輸業", id: 505 },
      { name: "倉庫業", id: 506 },
      { name: "運輸に附帯するサービス業", id: 507 },
      { name: "郵便業（信書便事業を含む）", id: 508 }
    ]
  },
  {
    name: "卸売業、小売業",
    id: 600,
    children: [
      { 
        name: "卸売業", 
        id: 601,
        children: [
          { name: "農畜産物・水産物卸売業", id: 6011 },
          { name: "食料・飲料卸売業", id: 6012 },
          { name: "建築材料、鉱物・金属材料等卸売業", id: 6013 },
          { name: "機械器具卸売業", id: 6014 }
        ]
      },
      { 
        name: "小売業", 
        id: 602,
        children: [
          { name: "各種商品小売業", id: 6021 },
          { name: "織物・衣服・身の回り品小売業", id: 6022 },
          { name: "飲食料品小売業", id: 6023 },
          { name: "機械器具小売業", id: 6024 }
        ]
      }
    ]
  },
  {
    name: "金融業、保険業",
    id: 700,
    children: [
      { 
        name: "銀行業", 
        id: 701,
        children: [
          { name: "中央銀行", id: 7011 },
          { name: "銀行", id: 7012 },
          { name: "中小企業等金融業", id: 7013 }
        ]
      },
      { name: "協同組織金融業", id: 702 },
      { 
        name: "貸金業、クレジットカード業等非預金信用機関", 
        id: 703,
        children: [
          { name: "貸金業", id: 7031 },
          { name: "クレジットカード業等", id: 7032 }
        ]
      },
      { name: "金融商品取引業、商品先物取引業", id: 704 },
      { name: "補助的金融業等", id: 705 },
      { 
        name: "保険業", 
        id: 706,
        children: [
          { name: "生命保険業", id: 7061 },
          { name: "損害保険業", id: 7062 },
          { name: "共済事業・少額短期保険業", id: 7063 }
        ]
      }
    ]
  },
  {
    name: "不動産業、物品賃貸業",
    id: 800,
    children: [
      { 
        name: "不動産業", 
        id: 801,
        children: [
          { name: "不動産取引業", id: 8011 },
          { name: "不動産賃貸業・管理業", id: 8012 }
        ]
      },
      { 
        name: "物品賃貸業", 
        id: 802,
        children: [
          { name: "各種物品賃貸業", id: 8021 },
          { name: "自動車・自転車賃貸業", id: 8022 },
          { name: "産業用機械器具賃貸業", id: 8023 }
        ]
      }
    ]
  },
  {
    name: "学術研究、専門・技術サービス業",
    id: 900,
    children: [
      { name: "学術・開発研究機関", id: 901 },
      { 
        name: "専門サービス業", 
        id: 902,
        children: [
          { name: "法務", id: 9021 },
          { name: "会計", id: 9022 },
          { name: "税理士", id: 9023 },
          { name: "社会保険労務士", id: 9024 }
        ]
      },
      { name: "広告業", id: 903 },
      { name: "技術サービス業", id: 904 }
    ]
  },
  {
    name: "宿泊業、飲食サービス業",
    id: 1000,
    children: [
      { 
        name: "宿泊業", 
        id: 1001,
        children: [
          { name: "旅館、ホテル", id: 10011 },
          { name: "簡易宿所", id: 10012 },
          { name: "下宿業", id: 10013 }
        ]
      },
      { 
        name: "飲食店", 
        id: 1002,
        children: [
          { name: "食堂、レストラン", id: 10021 },
          { name: "専門料理店", id: 10022 },
          { name: "そば・うどん店", id: 10023 },
          { name: "すし店", id: 10024 },
          { name: "酒場、ビヤホール", id: 10025 }
        ]
      },
      { name: "持ち帰り・配達飲食サービス業", id: 1003 }
    ]
  },
  {
    name: "生活関連サービス業、娯楽業",
    id: 1100,
    children: [
      { 
        name: "洗濯・理容・美容・浴場業", 
        id: 1101,
        children: [
          { name: "洗濯業", id: 11011 },
          { name: "理容業", id: 11012 },
          { name: "美容業", id: 11013 },
          { name: "浴場業", id: 11014 }
        ]
      },
      { name: "その他の生活関連サービス業", id: 1102 },
      { 
        name: "娯楽業", 
        id: 1103,
        children: [
          { name: "映画館", id: 11031 },
          { name: "劇場、興行場", id: 11032 },
          { name: "競輪・競馬等の競走場、競技団体", id: 11033 },
          { name: "スポーツ施設提供業", id: 11034 },
          { name: "公園、遊園地", id: 11035 }
        ]
      }
    ]
  },
  {
    name: "教育、学習支援業",
    id: 1200,
    children: [
      { name: "学校教育", id: 1201 },
      { name: "その他の教育、学習支援業", id: 1202 }
    ]
  },
  {
    name: "医療、福祉",
    id: 1300,
    children: [
      { 
        name: "医療業", 
        id: 1301,
        children: [
          { name: "病院", id: 13011 },
          { name: "一般診療所", id: 13012 },
          { name: "歯科診療所", id: 13013 },
          { name: "助産・看護業", id: 13014 }
        ]
      },
      { 
        name: "保健衛生", 
        id: 1302,
        children: [
          { name: "保健所", id: 13021 },
          { name: "その他の保健衛生", id: 13022 }
        ]
      },
      { 
        name: "社会保険・社会福祉・介護事業", 
        id: 1303,
        children: [
          { name: "社会保険事業団体", id: 13031 },
          { name: "福祉事業", id: 13032 },
          { name: "介護事業", id: 13033 }
        ]
      }
    ]
  },
  {
    name: "複合サービス事業",
    id: 1400,
    children: [
      { name: "郵便局", id: 1401 },
      { name: "協同組合", id: 1402 }
    ]
  },
  {
    name: "サービス業（他に分類されないもの）",
    id: 1500,
    children: [
      { name: "廃棄物処理業", id: 1501 },
      { name: "自動車整備業", id: 1502 },
      { name: "機械等修理業", id: 1503 },
      { name: "職業紹介・労働者派遣業", id: 1504 },
      { name: "その他の事業サービス業", id: 1505 },
      { name: "政治・経済・文化団体", id: 1506 },
      { name: "宗教", id: 1507 },
      { name: "その他のサービス業", id: 1508 }
    ]
  },
  {
    name: "公務（他に分類されるものを除く）",
    id: 1600,
    children: [
      { name: "国家公務", id: 1601 },
      { name: "地方公務", id: 1602 }
    ]
  }
]

export default function CategorySelectorDemo() {
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategory[]>([
    // 初期選択状態なし
  ])

  // 予設キーワード（図に基づく）
  const predefinedKeywords = [
    "農業、林業", "漁業", "建設業", "製造業", "印刷業、小売業", 
    "運輸業、郵便業", "金融業、保険業", "漁業", "建設業", "建設業", "印刷業、小売業",
    "運輸業、郵便業", "印刷業、小売業", "知識、小売業", "金融業、保険業", 
    "複合サービス事業", "紙・パルプ、砂利採取業", "電気・ガス・熱供給・水道業",
    "公務（他に分類されるものを除く）", "教育、学習支援業", "医療、福祉", "サービス業（他に分類されないもの）",
    "宿泊業、飲食サービス業", "不動産業、物品賃貸業", "学術研究、専門・技術サービス業", "分類不能の産業"
  ]

  const handleSelectionChange = (newSelection: SelectedCategory[]) => {
    setSelectedCategories(newSelection)
  }

  // 選択されたカテゴリーを親カテゴリー別にグループ化
  const getGroupedSelections = () => {
    const grouped: { [key: string]: SelectedCategory[] } = {}
    
    selectedCategories.forEach(category => {
      const parentName = category.parentName || '未分類'
      if (!grouped[parentName]) {
        grouped[parentName] = []
      }
      grouped[parentName].push(category)
    })
    
    return grouped
  }

  const groupedSelections = getGroupedSelections()

  return (
    <Box sx={{ 
      maxWidth: 1200, 
      margin: '0 auto', 
      padding: 3,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <Typography variant="h4" gutterBottom sx={{ 
        color: '#333', 
        fontWeight: 600,
        marginBottom: 3
      }}>
        カテゴリー選択コンポーネントデモ
      </Typography>
      
      <Typography variant="body1" sx={{ 
        color: '#666',
        marginBottom: 4,
        lineHeight: 1.6
      }}>
        階層的なカテゴリーデータから項目を選択できます。親カテゴリーをクリックすると全ての子項目が選択され、
        子項目は個別に選択・解除が可能です。上部のタグをクリックして選択を解除することもできます。
      </Typography>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <CategorySelector
          categories={majorCategories}
          selectedCategories={selectedCategories}
          onSelectionChange={handleSelectionChange}
          placeholder="キーワードを入力してください"
          predefinedKeywords={predefinedKeywords}
        />
      </Paper>

      {/* 選択結果の表示 */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
          選択結果
        </Typography>
        
        <Divider sx={{ marginBottom: 2 }} />
        
        {Object.keys(groupedSelections).length > 0 ? (
          <Box>
            {Object.entries(groupedSelections).map(([parentName, categories]) => (
              <Box key={parentName} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 600, 
                  color: '#1976d2',
                  marginBottom: 1
                }}>
                  {parentName}の選択: [{categories.map(cat => cat.name).join(', ')}]
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', marginLeft: 2 }}>
                  選択されたID: {categories.map(cat => cat.id).join(', ')}
                </Typography>
              </Box>
            ))}
            
            <Divider sx={{ margin: '16px 0' }} />
            
            <Typography variant="body2" sx={{ color: '#888' }}>
              総選択数: {selectedCategories.length}項目
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic' }}>
            カテゴリーが選択されていません
          </Typography>
        )}
      </Paper>
    </Box>
  )
}
