package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class GrettingController
{
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Gretting gretting(HelloMessage message) throws Exception
    {
        Thread.sleep(1000);
        return new Gretting("Hello, " + message.getName() + "!");
    }
}
