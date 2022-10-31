//package com.a401.backend.domain.TodoItem.controller;
//
//import com.a401.backend.domain.TodoItem.domain.TodoItem;
//import com.a401.backend.domain.TodoItem.dto.request.TodoItemRequestDto;
//import com.a401.backend.domain.TodoItem.dto.response.TodoItemResponseDto;
//import com.a401.backend.domain.TodoItem.service.TodoItemService;
//import com.a401.backend.domain.TodoList.domain.TodoList;
//import com.a401.backend.domain.TodoList.dto.request.TodoListRequestDto;
//import com.a401.backend.domain.TodoList.service.TodoListService;
//import com.a401.backend.domain.model.Subject;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.SerializationFeature;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.junit.Test;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.junit.runner.RunWith;
//import org.junit.runner.RunWith;
//import org.mockito.BDDMockito;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.restdocs.payload.PayloadDocumentation;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//import java.time.LocalDateTime;
//
//
//@DisplayName("Todo API 문서화")
//@ExtendWith(SpringExtension.class)
//@RunWith(SpringRunner.class)
//@WebMvcTest(TodoItemController.class)
//public class TodoItemControllerTest {
//
//    @MockBean
//    private TodoItemService todoItemService;
//
//    @MockBean
//    private TodoListService todoListService;
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    private TodoList todoList;
//    private TodoItem todoItem1;
//    private TodoItem todoItem2;
//
//    @BeforeEach
//    public void setUp(){
//        todoList = TodoList.builder().id(1L).date(LocalDateTime.now()).build();
//        todoItem1 = TodoItem.builder().id(1L).task("오늘까지 수능특강 (수학) 완성하기")
//                .subject(Subject.MATH).complete(false).todolist(todoList).build();
//
//        todoItem2 = TodoItem.builder().id(2L).task("오늘까지 수능 특강 (영어) 100쪽까지 풀기")
//                .subject(Subject.ENGLISH).complete(false).todolist(todoList).build();
//
//    }
//
//    @Test
//    public void saveTodoItem_테스트() throws Exception {
//        TodoListRequestDto todoListRequestDto = TodoListRequestDto.builder().date(LocalDateTime.now()).build();
//        TodoItemRequestDto todoItemRequestDto = TodoItemRequestDto.builder().
//                task("오늘까지 수능특강 (수학) 완성하기").
//                subject(Subject.MATH).complete(false).
//                todolistRequestDto(todoListRequestDto).build();
////        TodoItemRequestDto todoItemRequestDto2 = TodoItemRequestDto.builder().
////                task("오늘까지 수능 특강 (영어) 100쪽까지 풀기")
////                .subject(Subject.ENGLISH).complete(false).todolistRequestDto(todoListRequestDto).build();
//
////        TodoItemResponseDto todoItemResponseDto = new TodoItemResponseDto(todoItem1);
//
//        // json으로 바꿔줘야 한다. 그래서 objectMapper 사용
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.registerModule(new JavaTimeModule());
//        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
//        String content = objectMapper.writeValueAsString(todoItemRequestDto);
//
//        // given
//        Mockito.when(todoListService.saveTodoList(LocalDateTime.now())).thenReturn(todoList.getId());
//        Mockito.when(todoItemService.saveTodoItem(todoList.getId(), todoItemRequestDto)).thenReturn(todoItem1.getId());
////        BDDMockito.given(todoItemService.saveTodoItem(todoList.getId(), todoItemRequestDto2)).willReturn(todoItem2.getId());
//
//        ResultActions results = mockMvc.perform(MockMvcRequestBuilders.post("/todo/2022-04-03T12:00")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(content)
//                .characterEncoding("UTF-8"));
//
//        results.andExpect(MockMvcResultMatchers.status().isOk())
//                .andDo(MockMvcResultHandlers.print())
//                .andDo(MockMvcRestDocumentation.document("todo_save",
//                        PayloadDocumentation.requestFields(
//                                PayloadDocumentation.fieldWithPath("task").type(JsonFieldType.STRING).description("할 일"),
//                                PayloadDocumentation.fieldWithPath("complete").type(JsonFieldType.BOOLEAN).description("완료 유무"),
//                                PayloadDocumentation.fieldWithPath("subject").type(JsonFieldType.STRING).description("과목"),
//                                PayloadDocumentation.fieldWithPath("todolist").type(JsonFieldType.STRING).description("속해 있는 날")
//
//                        ),
//                        PayloadDocumentation.responseFields(PayloadDocumentation.fieldWithPath("id").type(JsonFieldType.NUMBER).description("돌려받은 todoItem id"))
//                        )
//                );
//
//
//
//    }
//
//    @Test
//    public void deleteTodoItem() {
//    }
//
//    @Test
//    public void updateTodoItem() {
//    }
//}