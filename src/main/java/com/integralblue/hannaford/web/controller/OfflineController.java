package com.integralblue.hannaford.web.controller;

import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.integralblue.hannaford.web.service.PageService;
import com.integralblue.hannaford.web.service.PageStateParserService;

@Controller
public class OfflineController {
	@Autowired
	private PageService pageService;
	@Autowired
	private PageStateParserService pageStateParserService;
	
    @RequestMapping(method=RequestMethod.GET, value={"/offline.html"})
	public String offline(Model model){
		Document document = pageService.getPage("/");
    	model.addAttribute("pageState",pageStateParserService.getPageState(document));
		return "offline";
	}
}
