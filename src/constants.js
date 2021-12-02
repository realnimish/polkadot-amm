export const PRECISION = 1000000;
export const RE = /^[0-9]*[.]?[0-9]{0,6}$/;
export const blockchainUrl =  "wss://ws.jupiter-poa.patract.cn/";
// Replace the below address with the address of the contract you deployed 
export const CONTRACT_ADDRESS = "5CUq8TpEVXKcgoB75fZQzjcFN7ZExyJGSZEEwYApUhRtGygK";
// Replace the below abi with the abi of the contract you deployed
export const abi = {
	"source": {
		"hash": "0x5d1618c769b7c6fbd47eaba1e43e2a8485c6c2c04461cbaa81991c2eeb24f827",
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
				"args": [
				{
					"name": "_fees",
					"type": {
						"displayName": [
						"Balance"
						],
						"type": 0
					}
				}
				],
				"docs": [
				"Constructs a new AMM instance",
				"@param _fees: valid interval -> [0,1000)"
				],
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
				"docs": [
				" Sends free token(s) to the invoker"
				],
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
				"docs": [
				" Returns the balance of the user"
				],
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
				"docs": [
				" Returns the amount of tokens locked in the pool,total shares issued & trading fee param"
				],
				"mutates": false,
				"name": [
				"getPoolDetails"
				],
				"payable": false,
				"returnType": {
					"displayName": [],
					"type": 10
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
				"docs": [
				" Returns amount of Token1 required when providing liquidity with _amountToken2 quantity of Token2"
				],
				"mutates": false,
				"name": [
				"getEquivalentToken1Estimate"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Returns amount of Token2 required when providing liquidity with _amountToken1 quantity of Token1"
				],
				"mutates": false,
				"name": [
				"getEquivalentToken2Estimate"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Adding new liquidity in the pool",
				" Returns the amount of share issued for locking given assets"
				],
				"mutates": true,
				"name": [
				"provide"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Returns the estimate of Token1 & Token2 that will be released on burning given _share"
				],
				"mutates": false,
				"name": [
				"getWithdrawEstimate"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 13
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
				"docs": [
				" Removes liquidity from the pool and releases corresponding Token1 & Token2 to the withdrawer"
				],
				"mutates": true,
				"name": [
				"withdraw"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 13
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
				"docs": [
				" Returns the amount of Token2 that the user will get when swapping a given amount of Token1 for Token2"
				],
				"mutates": false,
				"name": [
				"getSwapToken1EstimateGivenToken1"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
				},
				"selector": "0x6bc9f484"
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
				"docs": [
				" Returns the amount of Token1 that the user should swap to get _amountToken2 in return"
				],
				"mutates": false,
				"name": [
				"getSwapToken1EstimateGivenToken2"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Swaps given amount of Token1 to Token2 using algorithmic price determination",
				" Swap fails if Token2 amount is less than _minToken2"
				],
				"mutates": true,
				"name": [
				"swapToken1GivenToken1"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
				},
				"selector": "0x8adf0584"
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
				"docs": [
				" Swaps given amount of Token1 to Token2 using algorithmic price determination",
				" Swap fails if amount of Token1 required to obtain _amountToken2 exceeds _maxToken1"
				],
				"mutates": true,
				"name": [
				"swapToken1GivenToken2"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Returns the amount of Token2 that the user will get when swapping a given amount of Token1 for Token2"
				],
				"mutates": false,
				"name": [
				"getSwapToken2EstimateGivenToken2"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
				},
				"selector": "0xee312671"
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
				"docs": [
				" Returns the amount of Token2 that the user should swap to get _amountToken1 in return"
				],
				"mutates": false,
				"name": [
				"getSwapToken2EstimateGivenToken1"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
				"docs": [
				" Swaps given amount of Token2 to Token1 using algorithmic price determination",
				" Swap fails if Token1 amount is less than _minToken1"
				],
				"mutates": true,
				"name": [
				"swapToken2GivenToken2"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
				},
				"selector": "0xa28d3f0a"
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
				"docs": [
				" Swaps given amount of Token2 to Token1 using algorithmic price determination",
				" Swap fails if amount of Token2 required to obtain _amountToken1 exceeds _maxToken2"
				],
				"mutates": true,
				"name": [
				"swapToken2GivenToken1"
				],
				"payable": false,
				"returnType": {
					"displayName": [
					"Result"
					],
					"type": 11
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
						"struct": {
							"fields": [
							{
								"layout": {
									"struct": {
										"fields": [
										{
											"layout": {
												"cell": {
													"key": "0x0300000000000000000000000000000000000000000000000000000000000000",
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
																"key": "0x0400000000000000000000000000000000000000000000000000000000000000",
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
																		"key": "0x0400000001000000000000000000000000000000000000000000000000000000",
																		"ty": 3
																	}
																},
																"len": 4294967295,
																"offset": "0x0500000000000000000000000000000000000000000000000000000000000000"
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
												"key": "0x0500000001000000000000000000000000000000000000000000000000000000",
												"ty": 8
											}
										},
										"offset": "0x0400000001000000000000000000000000000000000000000000000000000000",
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
													"key": "0x0500000001000000000000000000000000000000000000000000000000000000",
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
																"key": "0x0600000001000000000000000000000000000000000000000000000000000000",
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
																		"key": "0x0600000002000000000000000000000000000000000000000000000000000000",
																		"ty": 3
																	}
																},
																"len": 4294967295,
																"offset": "0x0700000001000000000000000000000000000000000000000000000000000000"
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
												"key": "0x0700000002000000000000000000000000000000000000000000000000000000",
												"ty": 8
											}
										},
										"offset": "0x0600000002000000000000000000000000000000000000000000000000000000",
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
													"key": "0x0700000002000000000000000000000000000000000000000000000000000000",
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
																"key": "0x0800000002000000000000000000000000000000000000000000000000000000",
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
																		"key": "0x0800000003000000000000000000000000000000000000000000000000000000",
																		"ty": 3
																	}
																},
																"len": 4294967295,
																"offset": "0x0900000002000000000000000000000000000000000000000000000000000000"
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
												"key": "0x0900000003000000000000000000000000000000000000000000000000000000",
												"ty": 8
											}
										},
										"offset": "0x0800000003000000000000000000000000000000000000000000000000000000",
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
				},
				{
					"layout": {
						"cell": {
							"key": "0x0900000003000000000000000000000000000000000000000000000000000000",
							"ty": 0
						}
					},
					"name": "fees"
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
					"tuple": [
					0,
					0,
					0,
					0
					]
				}
			}
		},
		{
			"id": 11,
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
								"type": 12
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
					"type": 12
				}
				],
				"path": [
				"Result"
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
			"id": 13,
			"type": {
				"def": {
					"variant": {
						"variants": [
						{
							"fields": [
							{
								"type": 14
							}
							],
							"index": 0,
							"name": "Ok"
						},
						{
							"fields": [
							{
								"type": 12
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
					"type": 14
				},
				{
					"name": "E",
					"type": 12
				}
				],
				"path": [
				"Result"
				]
			}
		},
		{
			"id": 14,
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
