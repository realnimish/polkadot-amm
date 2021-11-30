export const PRECISION = 1000000;
export const RE = /^[0-9]*[.]?[0-9]{0,6}$/;
// Replace the below address with the address of the contract you deployed 
export const CONTRACT_ADDRESS = "5EyPHZVRBfV4zE3XPUz53CvFqme5owczAzt9fdGuAvgXA9g5";
// Replace the below abi with the abi of the contract you deployed
export const abi = {
  "source": {
    "hash": "0x91dffc039b1b271632326b8539f51a5662ce7e9dae76b026abcc496ba5dbf8a7",
    "language": "ink! 3.0.0-rc6",
    "compiler": "rustc 1.58.0-nightly"
  },
  "contract": {
    "name": "polkadot-amm",
    "version": "0.1.0",
    "authors": [
      "Nimish Agrawal realnimish@gmail.com"
    ]
  },
  "V1": {
    "spec": {
      "constructors": [
        {
          "args": [],
          "docs": [],
          "name": [
            "new"
          ],
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [],
      "messages": [
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "faucet"
          ],
          "payable": false,
          "returnType": null,
          "selector": "0x91bd0a53"
        },
        {
          "args": [],
          "docs": [],
          "mutates": false,
          "name": [
            "getMyHoldings"
          ],
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 9
          },
          "selector": "0x4646fd22"
        },
        {
          "args": [],
          "docs": [],
          "mutates": false,
          "name": [
            "getPoolDetails"
          ],
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 9
          },
          "selector": "0xc1d33772"
        },
        {
          "args": [
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getEquivalentToken1Estimate"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x3814b1f7"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getEquivalentToken2Estimate"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x5a431238"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "provide"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x3f1420fd"
        },
        {
          "args": [
            {
              "name": "_share",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getWithdrawEstimate"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 12
          },
          "selector": "0x4d684150"
        },
        {
          "args": [
            {
              "name": "_share",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "withdraw"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 12
          },
          "selector": "0x410fcc9d"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getSwapToken1Estimate"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x41d4a6bb"
        },
        {
          "args": [
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getSwapToken1EstimateGivenToken2"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x397bf950"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_minToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "swapToken1"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0xaa79a054"
        },
        {
          "args": [
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_maxToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "swapToken1GivenToken2"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x3f4171b1"
        },
        {
          "args": [
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getSwapToken2Estimate"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x7453d92a"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "getSwapToken2EstimateGivenToken1"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0xe20b04d7"
        },
        {
          "args": [
            {
              "name": "_amountToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_minToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "swapToken2"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0xa636805e"
        },
        {
          "args": [
            {
              "name": "_amountToken1",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            },
            {
              "name": "_maxToken2",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "swapToken2GivenToken1"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x1ccb6598"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "totalShares"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "totalToken1"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "totalToken2"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "K"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                                "ty": 1
                              }
                            },
                            "name": "header"
                          },
                          {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                                        "ty": 2
                                      }
                                    },
                                    "name": "len"
                                  },
                                  {
                                    "layout": {
                                      "array": {
                                        "cellsPerElem": 1,
                                        "layout": {
                                          "cell": {
                                            "key": "0x0500000001000000000000000000000000000000000000000000000000000000",
                                            "ty": 3
                                          }
                                        },
                                        "len": 4294967295,
                                        "offset": "0x0600000000000000000000000000000000000000000000000000000000000000"
                                      }
                                    },
                                    "name": "elems"
                                  }
                                ]
                              }
                            },
                            "name": "entries"
                          }
                        ]
                      }
                    },
                    "name": "keys"
                  },
                  {
                    "layout": {
                      "hash": {
                        "layout": {
                          "cell": {
                            "key": "0x0600000001000000000000000000000000000000000000000000000000000000",
                            "ty": 8
                          }
                        },
                        "offset": "0x0500000001000000000000000000000000000000000000000000000000000000",
                        "strategy": {
                          "hasher": "Blake2x256",
                          "postfix": "",
                          "prefix": "0x696e6b20686173686d6170"
                        }
                      }
                    },
                    "name": "values"
                  }
                ]
              }
            },
            "name": "shares"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x0600000001000000000000000000000000000000000000000000000000000000",
                                "ty": 1
                              }
                            },
                            "name": "header"
                          },
                          {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0700000001000000000000000000000000000000000000000000000000000000",
                                        "ty": 2
                                      }
                                    },
                                    "name": "len"
                                  },
                                  {
                                    "layout": {
                                      "array": {
                                        "cellsPerElem": 1,
                                        "layout": {
                                          "cell": {
                                            "key": "0x0700000002000000000000000000000000000000000000000000000000000000",
                                            "ty": 3
                                          }
                                        },
                                        "len": 4294967295,
                                        "offset": "0x0800000001000000000000000000000000000000000000000000000000000000"
                                      }
                                    },
                                    "name": "elems"
                                  }
                                ]
                              }
                            },
                            "name": "entries"
                          }
                        ]
                      }
                    },
                    "name": "keys"
                  },
                  {
                    "layout": {
                      "hash": {
                        "layout": {
                          "cell": {
                            "key": "0x0800000002000000000000000000000000000000000000000000000000000000",
                            "ty": 8
                          }
                        },
                        "offset": "0x0700000002000000000000000000000000000000000000000000000000000000",
                        "strategy": {
                          "hasher": "Blake2x256",
                          "postfix": "",
                          "prefix": "0x696e6b20686173686d6170"
                        }
                      }
                    },
                    "name": "values"
                  }
                ]
              }
            },
            "name": "token1Balance"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x0800000002000000000000000000000000000000000000000000000000000000",
                                "ty": 1
                              }
                            },
                            "name": "header"
                          },
                          {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0900000002000000000000000000000000000000000000000000000000000000",
                                        "ty": 2
                                      }
                                    },
                                    "name": "len"
                                  },
                                  {
                                    "layout": {
                                      "array": {
                                        "cellsPerElem": 1,
                                        "layout": {
                                          "cell": {
                                            "key": "0x0900000003000000000000000000000000000000000000000000000000000000",
                                            "ty": 3
                                          }
                                        },
                                        "len": 4294967295,
                                        "offset": "0x0a00000002000000000000000000000000000000000000000000000000000000"
                                      }
                                    },
                                    "name": "elems"
                                  }
                                ]
                              }
                            },
                            "name": "entries"
                          }
                        ]
                      }
                    },
                    "name": "keys"
                  },
                  {
                    "layout": {
                      "hash": {
                        "layout": {
                          "cell": {
                            "key": "0x0a00000003000000000000000000000000000000000000000000000000000000",
                            "ty": 8
                          }
                        },
                        "offset": "0x0900000003000000000000000000000000000000000000000000000000000000",
                        "strategy": {
                          "hasher": "Blake2x256",
                          "postfix": "",
                          "prefix": "0x696e6b20686173686d6170"
                        }
                      }
                    },
                    "name": "values"
                  }
                ]
              }
            },
            "name": "token2Balance"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "last_vacant",
                  "type": 2,
                  "typeName": "Index"
                },
                {
                  "name": "len",
                  "type": 2,
                  "typeName": "u32"
                },
                {
                  "name": "len_entries",
                  "type": 2,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "ink_storage",
            "collections",
            "stash",
            "Header"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 7,
                      "typeName": "VacantEntry"
                    }
                  ],
                  "index": 0,
                  "name": "Vacant"
                },
                {
                  "fields": [
                    {
                      "type": 4,
                      "typeName": "T"
                    }
                  ],
                  "index": 1,
                  "name": "Occupied"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 4
            }
          ],
          "path": [
            "ink_storage",
            "collections",
            "stash",
            "Entry"
          ]
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 5,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 6
            }
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "next",
                  "type": 2,
                  "typeName": "Index"
                },
                {
                  "name": "prev",
                  "type": 2,
                  "typeName": "Index"
                }
              ]
            }
          },
          "path": [
            "ink_storage",
            "collections",
            "stash",
            "VacantEntry"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "value",
                  "type": 0,
                  "typeName": "V"
                },
                {
                  "name": "key_index",
                  "type": 2,
                  "typeName": "KeyIndex"
                }
              ]
            }
          },
          "params": [
            {
              "name": "V",
              "type": 0
            }
          ],
          "path": [
            "ink_storage",
            "collections",
            "hashmap",
            "ValueEntry"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "tuple": [
              0,
              0,
              0
            ]
          }
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 0
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 0
            },
            {
              "name": "E",
              "type": 11
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "ZeroLiquidity"
                },
                {
                  "index": 1,
                  "name": "ZeroAmount"
                },
                {
                  "index": 2,
                  "name": "InsufficientAmount"
                },
                {
                  "index": 3,
                  "name": "NonEquivalentValue"
                },
                {
                  "index": 4,
                  "name": "ThresholdNotReached"
                },
                {
                  "index": 5,
                  "name": "InvalidShare"
                },
                {
                  "index": 6,
                  "name": "InsufficientLiquidity"
                },
                {
                  "index": 7,
                  "name": "SlippageExceeded"
                }
              ]
            }
          },
          "path": [
            "amm",
            "amm",
            "Error"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 13
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 13
            },
            {
              "name": "E",
              "type": 11
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "tuple": [
              0,
              0
            ]
          }
        }
      }
    ]
  }
}